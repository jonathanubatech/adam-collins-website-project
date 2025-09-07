FROM node:20-bullseye

# Install common OS deps and fonts for headless browsers, Lighthouse, and Playwright
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      ca-certificates \
      git \
      curl \
      unzip \
      xvfb \
      libnss3 \
      libxss1 \
      libasound2 \
      libxshmfence1 \
      libatk1.0-0 \
      libatk-bridge2.0-0 \
      libgtk-3-0 \
      libgbm1 \
      libdrm2 \
      libxcomposite1 \
      libxdamage1 \
      libpango-1.0-0 \
      libxrandr2 \
      fonts-liberation \
      gconf-service \
      libappindicator3-1 \
      libu2f-udev \
      dumb-init && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# Pre-install Playwright browsers and system deps so agents can run tests without extra setup
# Pin a recent version compatible with Node 20; adjust if your project uses a specific version.
RUN npx --yes playwright@1.45.2 install --with-deps chromium

# Helpful environment for headless tools that expect Chrome
ENV PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright \
    CHROME_PATH=/root/.cache/ms-playwright/chromium-*/chrome/linux-*/chrome \
    CI=1

# Default command (Cursor Background will override to run your tasks)
CMD ["bash"]

