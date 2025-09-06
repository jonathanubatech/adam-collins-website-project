/**
 * Jest Test Setup for Adam Collins Website Project
 * Configures testing environment and global test utilities
 */

import '@testing-library/jest-dom';

// Mock Figma Sites API if needed
global.figmaSites = {
  // Add any Figma Sites specific mocks here
};

// Mock window.matchMedia for responsive testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver for responsive component tests
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock performance API for performance testing
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByType: jest.fn(() => []),
    getEntriesByName: jest.fn(() => []),
  },
});

// Mock console methods to reduce noise in tests
const originalConsole = { ...console };
beforeAll(() => {
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
});

// Global test utilities
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAccessible(): R;
      toHaveGoodPerformance(): R;
    }
  }
}

// Custom matchers for accessibility testing
expect.extend({
  toBeAccessible(received) {
    // Basic accessibility checks
    const hasAltText = received.querySelectorAll('img:not([alt])').length === 0;
    const hasHeadings = received.querySelectorAll('h1, h2, h3, h4, h5, h6').length > 0;
    const hasLabels = received.querySelectorAll('input:not([aria-label]):not([aria-labelledby])').length === 0;
    
    const pass = hasAltText && hasHeadings && hasLabels;
    
    return {
      message: () => 
        pass 
          ? 'Element is accessible'
          : 'Element has accessibility issues',
      pass,
    };
  },
  
  toHaveGoodPerformance(received) {
    // Basic performance checks
    const images = received.querySelectorAll('img');
    const hasOptimizedImages = Array.from(images).every(img => 
      img.src.includes('webp') || img.src.includes('optimized')
    );
    
    const pass = hasOptimizedImages;
    
    return {
      message: () =>
        pass
          ? 'Element has good performance characteristics'
          : 'Element has performance issues',
      pass,
    };
  },
});
