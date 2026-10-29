# Base image already contains Chromium/Firefox/WebKit and system dependencies.
# Keep this tag in sync with the @playwright/test version in package-lock.json.
FROM mcr.microsoft.com/playwright:v1.64.1-noble

WORKDIR /app

# Install dependencies first so Docker can cache this layer.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Credentials are NOT stored in the image. Pass them at run time:
#   docker run --rm -e SAUCE_USER=... -e SAUCE_PASSWORD=... saucedemo-tests
ENV CI=true

CMD ["npx", "playwright", "test"]
