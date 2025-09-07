# Adam Collins Website Project

## 🎯 Project Overview
**Purpose:** Debug and optimize a Figma Sites website for production deployment  
**Type:** Full Claude Integration Project with AI agent automation  
**Timeline:** 2-4 weeks  
**Status:** 🚀 Ready for Development  

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 8+
- Figma Sites account and access
- Cursor IDE with Claude integration
- Git for version control

### Installation
```bash
# Clone and setup
git clone <repository-url>
cd adam-collins-website-project

# Install dependencies
npm install

# Start development server
npm run dev
```

### AI Agent Setup
```bash
# Initialize TaskMaster for AI-powered task management
taskmaster:initialize_project --projectRoot="$(pwd)" --rules=["cursor", "claude", "anthropic"]

# Generate tasks from PRD
taskmaster:parse_prd --projectRoot="$(pwd)" --input=".taskmaster/docs/prd.txt" --research=true
```

## 🏗️ Project Structure

```
adam-collins-website-project/
├── .claude/                    # Claude AI context and prompts
│   ├── prompts/               # Project instructions and prompts
│   ├── context/               # Current state and decisions
│   ├── artifacts/             # Generated code and assets
│   └── recovery/              # Backup and recovery files
├── .taskmaster/               # TaskMaster AI task management
│   ├── docs/                  # PRD and documentation
│   ├── tasks/                 # Task tracking and progress
│   └── reports/               # Analysis and complexity reports
├── src/                       # Source code
│   ├── components/            # React components
│   ├── pages/                 # Page components
│   ├── styles/                # CSS and styling
│   └── utils/                 # Utility functions
├── tests/                     # Test suites
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── e2e/                   # End-to-end tests
├── scripts/                   # Automation scripts
│   ├── quality/               # Quality assurance
│   ├── deployment/            # Deployment automation
│   └── automation/            # General automation
├── docs/                      # Documentation
│   ├── api/                   # API documentation
│   ├── architecture/          # System architecture
│   └── changelog/             # Version history
├── public/                    # Static assets
│   ├── images/                # Images and graphics
│   ├── icons/                 # Icons and favicons
│   └── assets/                # Other static files
└── logs/                      # Application logs
```

## 🎯 Project Goals

### Performance Excellence
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Lighthouse Score:** > 90 across all categories
- **Load Time:** < 3 seconds on 3G connection
- **Image Optimization:** WebP format, lazy loading, proper sizing

### Accessibility Compliance
- **WCAG 2.1 AA:** Full compliance across all pages
- **Keyboard Navigation:** Complete keyboard accessibility
- **Screen Reader Support:** Proper ARIA labels and semantic HTML
- **Color Contrast:** Minimum 4.5:1 ratio for all text

### SEO Optimization
- **Search Rankings:** Optimized for relevant keywords
- **Meta Tags:** Complete and optimized for all pages
- **Structured Data:** JSON-LD markup for business information
- **Social Sharing:** Open Graph and Twitter Card tags

### Cross-Browser Compatibility
- **Chrome, Firefox, Safari, Edge:** Last 2 versions
- **Mobile Browsers:** iOS Safari, Chrome Mobile
- **Responsive Design:** Perfect on all device sizes
- **Feature Parity:** Consistent functionality across browsers

## 🛠️ Development Workflow

### Daily Development
1. **Morning Setup**
   ```bash
   # Get next task from TaskMaster
   taskmaster:next_task --projectRoot="$(pwd)"
   
   # Start development server
   npm run dev
   ```

2. **Development Session**
   - Use Claude for AI-assisted coding
   - Follow Figma design system
   - Test frequently with quality checks
   - Document decisions in context files

3. **End of Day**
   ```bash
   # Update task status
   taskmaster:set_task_status --id="X" --status="done" --projectRoot="$(pwd)"
   
   # Run quality checks
   npm run quality-check
   
   # Commit changes
   git add . && git commit -m "feat: description of changes"
   ```

### Quality Assurance
```bash
# Run all quality checks
npm run quality-check

# Run specific checks
npm run lint          # Code linting
npm run type-check    # TypeScript checking
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests

# Performance analysis
npm run analyze       # Lighthouse analysis
npm run accessibility # Accessibility audit
npm run performance   # Performance metrics
npm run seo          # SEO analysis
```

## 🤖 AI Agent Integration

### Claude (Primary Development Assistant)
- **Code Generation:** AI-assisted component and function creation
- **Debugging:** Intelligent error detection and resolution
- **Code Review:** Automated code quality assessment
- **Documentation:** Auto-generated documentation and comments

### TaskMaster (Project Management)
- **Task Generation:** AI-powered task breakdown from PRD
- **Progress Tracking:** Real-time project progress monitoring
- **Complexity Analysis:** Automated task complexity assessment
- **Research Integration:** Perplexity AI for best practices research

### Perplexity AI (Research and Best Practices)
- **Performance Optimization:** Latest web performance techniques
- **Accessibility Research:** WCAG compliance best practices
- **SEO Strategies:** Current SEO optimization methods
- **Browser Compatibility:** Cross-browser testing strategies

## 📊 Success Metrics

### Performance Metrics
- **Lighthouse Performance:** > 90
- **Core Web Vitals:** All in "Good" range
- **Page Load Speed:** < 3 seconds
- **Image Optimization:** WebP, lazy loading, proper sizing

### Quality Metrics
- **Test Coverage:** > 80% for custom code
- **Linting:** Zero ESLint errors
- **Type Safety:** Zero TypeScript errors
- **Accessibility:** WCAG 2.1 AA compliant

### Production Readiness
- **Zero Critical Bugs:** All critical issues resolved
- **Error Monitoring:** Real-time error tracking
- **Performance Monitoring:** Continuous performance tracking
- **Documentation:** Complete and up-to-date

## 🚀 Deployment

### Production Deployment
```bash
# Build for production
npm run build

# Deploy to Figma Sites
npm run deploy

# Verify deployment
npm run analyze
```

### Monitoring Setup
- **Performance Monitoring:** Real-time Core Web Vitals tracking
- **Error Tracking:** Automated error detection and alerting
- **Uptime Monitoring:** 99.9% availability target
- **Security Monitoring:** Automated security scanning

## 📚 Documentation

### Key Documents
- **[[.taskmaster/docs/prd.txt|Product Requirements Document]]** - Complete project requirements
- **[[.claude/prompts/project-instructions.md|Project Instructions]]** - Claude AI context
- **[[.claude/context/current_state.md|Current State]]** - Project status and decisions
- **[[docs/architecture/|Architecture Documentation]]** - System design and patterns

### Development Resources
- **[[10-Cookbook/Cookbook Overview|Cookbook]]** - Practical development techniques
- **[[11-Prompt Library/Prompt Library Overview|Prompt Library]]** - AI prompts and templates
- **[[08-Team Architecture/Claude Development Workflow Guide|Claude Workflow]]** - AI-assisted development

## 🧠 Background Agents

- Setup guide: `docs/background-agents-setup.md`
- Docker runtime: `background.Dockerfile`
- Agent commands: `scripts/background/setup.sh`, `scripts/background/ci.sh`

## 📝 Contributing & PRs
- Guidelines: `CONTRIBUTING.md`
- PR Template: `.github/PULL_REQUEST_TEMPLATE.md`

## 🆘 Troubleshooting

### Common Issues
- **Figma Sites Access:** Ensure proper account permissions
- **Build Errors:** Check TypeScript and ESLint configurations
- **Performance Issues:** Use Lighthouse analysis and optimization
- **Accessibility Problems:** Run axe-core accessibility testing

### Getting Help
- **Claude AI:** Use project context for specific questions
- **TaskMaster:** Check task status and progress
- **Documentation:** Review project documentation and guides
- **Quality Reports:** Check `reports/` directory for detailed analysis

## 📈 Next Steps

### Immediate (Today)
1. **Open in Cursor:** `cursor .`
2. **Initialize TaskMaster:** Set up AI task management
3. **Analyze Current Site:** Identify issues and optimization opportunities
4. **Start Debugging:** Begin systematic issue resolution

### Short-term (This Week)
1. **Complete Setup:** Finish all configuration and tooling
2. **Initial Analysis:** Comprehensive site audit and issue identification
3. **Begin Optimization:** Start performance and accessibility improvements
4. **Set Up Monitoring:** Implement quality and performance tracking

### Long-term (This Month)
1. **Complete Optimization:** All performance and accessibility goals met
2. **Production Deployment:** Stable, monitored, production-ready site
3. **Documentation:** Complete project documentation and handover
4. **Knowledge Transfer:** Share learnings and best practices

---

## Change Log

### Version 1.1.0 - 2025-09-07
**Type:** Tooling & Docs  
**Changes:**
- Add Background Agents runtime (`background.Dockerfile`) and scripts
- Add `.dockerignore` and Docker cleanup helper
- Add Background Agents setup guide and contribution/PR docs
- Link docs from README

### Version 1.0.0 - 2025-01-27
**Author:** Claude Assistant  
**Type:** Initial Release  
**Changes:**
- Created complete project structure for Adam Collins website
- Set up full Claude integration with AI agents
- Configured TaskMaster for AI-powered project management
- Established quality assurance and testing framework
- Ready for immediate development in Cursor

---

*This project is set up with the complete LLM Development Architecture framework for maximum productivity and quality.*
