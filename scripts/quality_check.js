#!/usr/bin/env node

/**
 * Quality Check Script for Adam Collins Website Project
 * Runs comprehensive quality checks for Figma Sites website
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class QualityChecker {
  constructor() {
    this.projectRoot = process.cwd();
    this.results = {
      timestamp: new Date().toISOString(),
      project: 'adam-collins-website-project',
      checks: {},
      overall: 'pending'
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async runCommand(command, description) {
    try {
      this.log(`Running ${description}...`);
      const result = execSync(command, { 
        cwd: this.projectRoot, 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      return { success: true, output: result };
    } catch (error) {
      return { 
        success: false, 
        error: error.message, 
        output: error.stdout || error.stderr 
      };
    }
  }

  async checkLinting() {
    const result = await this.runCommand(
      'npm run lint',
      'ESLint code linting'
    );
    
    this.results.checks.linting = {
      status: result.success ? 'passed' : 'failed',
      description: 'Code style and quality checks',
      details: result.success ? 'No linting errors found' : result.error
    };
    
    return result.success;
  }

  async checkTypeScript() {
    const result = await this.runCommand(
      'npm run type-check',
      'TypeScript type checking'
    );
    
    this.results.checks.typescript = {
      status: result.success ? 'passed' : 'failed',
      description: 'TypeScript type safety',
      details: result.success ? 'No type errors found' : result.error
    };
    
    return result.success;
  }

  async checkTests() {
    const result = await this.runCommand(
      'npm run test:coverage',
      'Unit tests with coverage'
    );
    
    // Parse coverage from output
    const coverageMatch = result.output?.match(/(\d+\.?\d*)% coverage/);
    const coverage = coverageMatch ? parseFloat(coverageMatch[1]) : 0;
    
    this.results.checks.tests = {
      status: result.success && coverage >= 80 ? 'passed' : 'failed',
      description: 'Unit tests and coverage',
      details: result.success ? 
        `${coverage}% test coverage (target: 80%)` : 
        result.error,
      coverage: coverage
    };
    
    return result.success && coverage >= 80;
  }

  async checkPerformance() {
    // This would typically run against a local dev server
    // For now, we'll check if the build process works
    const result = await this.runCommand(
      'npm run build',
      'Build process verification'
    );
    
    this.results.checks.performance = {
      status: result.success ? 'passed' : 'failed',
      description: 'Build process and performance',
      details: result.success ? 
        'Build completed successfully' : 
        result.error
    };
    
    return result.success;
  }

  async checkAccessibility() {
    // Check if accessibility testing tools are available
    const axeInstalled = fs.existsSync(
      path.join(this.projectRoot, 'node_modules', '@axe-core', 'cli')
    );
    
    if (!axeInstalled) {
      this.results.checks.accessibility = {
        status: 'skipped',
        description: 'Accessibility testing',
        details: 'Axe CLI not installed - run npm install to enable'
      };
      return true;
    }

    // In a real scenario, this would run against a live server
    this.results.checks.accessibility = {
      status: 'pending',
      description: 'Accessibility testing',
      details: 'Requires running dev server - use npm run accessibility'
    };
    
    return true;
  }

  async checkSecurity() {
    // Check for common security issues in package.json
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      this.results.checks.security = {
        status: 'failed',
        description: 'Security audit',
        details: 'package.json not found'
      };
      return false;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const hasHttps = packageJson.homepage?.startsWith('https://');
    
    this.results.checks.security = {
      status: hasHttps ? 'passed' : 'warning',
      description: 'Security configuration',
      details: hasHttps ? 
        'HTTPS configured' : 
        'HTTPS not configured in package.json'
    };
    
    return true;
  }

  async checkDocumentation() {
    const requiredDocs = [
      'README.md',
      'docs/README.md',
      '.claude/prompts/project-instructions.md'
    ];
    
    const missingDocs = requiredDocs.filter(doc => 
      !fs.existsSync(path.join(this.projectRoot, doc))
    );
    
    this.results.checks.documentation = {
      status: missingDocs.length === 0 ? 'passed' : 'warning',
      description: 'Documentation completeness',
      details: missingDocs.length === 0 ? 
        'All required documentation present' : 
        `Missing: ${missingDocs.join(', ')}`
    };
    
    return missingDocs.length === 0;
  }

  async generateReport() {
    const reportPath = path.join(this.projectRoot, 'reports', 'quality-report.json');
    const reportDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    this.log(`Quality report saved to ${reportPath}`);
  }

  async runAllChecks() {
    this.log('Starting comprehensive quality checks...');
    
    const checks = [
      this.checkLinting(),
      this.checkTypeScript(),
      this.checkTests(),
      this.checkPerformance(),
      this.checkAccessibility(),
      this.checkSecurity(),
      this.checkDocumentation()
    ];
    
    const results = await Promise.all(checks);
    const passedChecks = results.filter(Boolean).length;
    const totalChecks = results.length;
    
    this.results.overall = passedChecks === totalChecks ? 'passed' : 'failed';
    this.results.summary = {
      passed: passedChecks,
      total: totalChecks,
      percentage: Math.round((passedChecks / totalChecks) * 100)
    };
    
    await this.generateReport();
    
    this.log(`Quality checks completed: ${passedChecks}/${totalChecks} passed`);
    
    if (this.results.overall === 'passed') {
      this.log('All quality checks passed! 🎉', 'success');
    } else {
      this.log('Some quality checks failed. Please review the report.', 'error');
    }
    
    return this.results.overall === 'passed';
  }
}

// Run quality checks if this script is executed directly
if (require.main === module) {
  const checker = new QualityChecker();
  checker.runAllChecks()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
      console.error('Quality check failed:', error);
      process.exit(1);
    });
}

module.exports = QualityChecker;
