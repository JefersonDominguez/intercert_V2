import fs from 'fs';
import path from 'path';
import { COUNTRIES } from '../src/config/countries.js';

const BASE_ROUTES = [
  '/home',
  '/about',
  '/services',
  '/certificacion-iso',
  '/contact',
  '/blog',
  '/projects',
  '/faq',
  '/about-partners',
];

// Certificaciones ISO específicas para landing pages
const ISO_CERTIFICATIONS = [
  'iso-9001',
  'iso-14001', 
  'iso-45001',
  'iso-27001',
  'iso-22000',
  'iso-50001',
  'iso-37001',
  'iso-13485',
  'iso-21001',
  'iso-39001'
];

// Sectores específicos para páginas de servicios
const SECTORS = [
  'educativo',
  'pesca', 
  'construccion',
  'salud',
  'alimentos-bebidas',
  'agroexportacion',
  'soluciones-sostenibles',
  'tecnologias-informacion',
  'manufactura',
  'energia'
];

const buildUrl = (countryCode, route) => {
  if (countryCode === 'global') {
    return `https://intercertlatam.com${route}`;
  }
  return `https://intercertlatam.com/${countryCode}${route}`;
};

const generateUrls = () => {
  const urls = [];
  
  Object.values(COUNTRIES).forEach((country) => {
    // Rutas base por país
    BASE_ROUTES.forEach((route) => {
      urls.push({
        loc: buildUrl(country.code, route),
        priority: route === '/home' ? '1.00' : route === '/certificacion-iso' ? '0.95' : '0.85',
        changefreq: route === '/home' ? 'daily' : route === '/blog' ? 'weekly' : 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      });
    });

    // Páginas específicas por certificación ISO + país
    ISO_CERTIFICATIONS.forEach((iso) => {
      urls.push({
        loc: buildUrl(country.code, `/certificacion-${iso}${country.code !== 'global' ? `-${country.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : ''}`),
        priority: '0.90',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      });
      
      // Páginas de auditoría por ISO + país
      urls.push({
        loc: buildUrl(country.code, `/auditoria-${iso}${country.code !== 'global' ? `-${country.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : ''}`),
        priority: '0.85',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      });
    });

    // Páginas por sector + país  
    SECTORS.forEach((sector) => {
      urls.push({
        loc: buildUrl(country.code, `/sector/${sector}`),
        priority: '0.80',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      });
    });

    // Páginas de consultoría por país
    if (country.code !== 'global') {
      urls.push({
        loc: buildUrl(country.code, `/consultoria-iso-${country.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`),
        priority: '0.90',
        changefreq: 'monthly', 
        lastmod: new Date().toISOString().split('T')[0]
      });
      
      // Página de precios por país
      urls.push({
        loc: buildUrl(country.code, `/precios-certificacion-iso-${country.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`),
        priority: '0.88',
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0]
      });
    }
  });
  
  return urls;
};

const urls = generateUrls();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

// También generar un sitemap específico por país para Google Search Console
const countrySitemaps = Object.values(COUNTRIES).map(country => {
  if (country.code === 'global') return null;
  
  const countryUrls = urls.filter(url => url.loc.includes(`/${country.code}/`));
  const countryXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${countryUrls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
  
  const countryPath = path.resolve(process.cwd(), 'public', `sitemap-${country.code}.xml`);
  fs.writeFileSync(countryPath, countryXml.trim());
  return `sitemap-${country.code}.xml`;
}).filter(Boolean);

const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml.trim());

// Crear sitemap index
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://intercertlatam.com/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
${countrySitemaps.map(sitemap => `  <sitemap>
    <loc>https://intercertlatam.com/${sitemap}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>
`;

const indexPath = path.resolve(process.cwd(), 'public', 'sitemap-index.xml');
fs.writeFileSync(indexPath, sitemapIndex.trim());

console.log(`Sitemap principal generado en ${outputPath}`);
console.log(`Sitemaps por país: ${countrySitemaps.join(', ')}`);
console.log(`Sitemap index generado en ${indexPath}`);

