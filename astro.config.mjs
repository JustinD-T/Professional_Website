// @ts-check
import { defineConfig } from "astro/config";

// Placeholder values until the domain is chosen (plan section 11).
// CI passes SITE_URL and BASE_PATH from actions/configure-pages, so a GitHub
// Pages project site (https://<user>.github.io/<repo>/) gets the right base.
// Locally both fall back to a root deploy.
const site = process.env.SITE_URL || "https://example.com";
const base = process.env.BASE_PATH || "/";

export default defineConfig({
	site,
	base,
	trailingSlash: "ignore",
});
