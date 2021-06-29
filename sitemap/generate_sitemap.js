const fs = require("fs");
const pretty = require("prettier");
(async () => {
  const backend_url = "https://rest.corecare.in";
  const domain = "https://www.dev.corecare.in";
  const createStaticSitemap = () => {
    const url_links = [
      { loc: "/", changefreq: "daily", priority: "1.0" },
      { loc: "/about", changefreq: "daily", priority: "0.6" },
      { loc: "/contact", changefreq: "daily", priority: "0.6" },
      { loc: "/login", changefreq: "daily", priority: "0.8" },
      { loc: "/become-a-partner", changefreq: "daily", priority: "0.8" },
      { loc: "/cart", changefreq: "daily", priority: "0.8" },
      { loc: "/blog", changefreq: "daily", priority: "0.8" },
    ];
    return url_links;
  };
  const createDynamicSitemap = (
    services,
    posts
  ) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
            ${services
              .map(({ slug }) => {
                return `
                        <url>
                            <loc>${`${domain}/services/${slug}`}</loc>
                            <changefreq>daily</changefreq>
                            <lastmod>2021-05-23T12:14:44+00:00</lastmod>
                            <priority>1.0</priority>
                        </url>
                    `;
              })
              .join("")}
            ${createStaticSitemap()
              .map((link) => {
                return `
                        <url>
                            <loc>${`${domain}${link.loc}`}</loc>
                            <changefreq>${link.changefreq}</changefreq>
                            <lastmod>2021-05-23T12:14:44+00:00</lastmod>
                            <priority>${link.priority}</priority>
                        </url>
                `;
              })
              .join("")}
              ${posts.map(x => {
                return `
                    <url>
                        <loc>${`${domain}/blog/${x.date_slug.year}/${x.date_slug.month}/${x.date_slug.day}/${x.slug}`}</loc>
                        <changefreq>daily</changefreq>
                        <lastmod>2021-05-23T12:14:44+00:00</lastmod>
                        <priority>0.7</priority>
                    </url>
                `;
              })}
        </urlset>
        `;
  const request = await fetch(backend_url + '/employee_category/');
  const services = await request.json();
  const postRequest = await fetch(backend_url + '/blog/posts/')
  const posts = await postRequest.json()
  const sitemap = pretty.format(createDynamicSitemap(services, posts), {
    parser: "html",
  });
  fs.writeFileSync("public/sitemap.xml", sitemap);
})();
