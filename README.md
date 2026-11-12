# Mash Restoration Panel Beaters

Responsive static website for Mash Restoration Panel Beaters, 1 Liverpool Road, Belmont, Bulawayo, Zimbabwe.

## Pages
- `index.html` — cinematic homepage, services, selected restorations, interactive 3D showcase, quote enquiry and contact details.
- `hilux-legend45.html` — Toyota Hilux Legend 45 restoration story.
- `hilux-agx7577.html` — silver Toyota Hilux Revo AGX 7577 restoration story.
- `hilux-single-cab.html` — Toyota Hilux single-cab restoration story.
- `project.html` — legacy redirect to the Legend 45 story.

## Stack and experience
- Semantic HTML, responsive CSS and vanilla JavaScript; no build step.
- Responsive navigation, mobile-first page layouts, reduced-motion support and scroll reveal transitions.
- The supplied Mash restoration GIF is the homepage hero.
- The original Mash logo and all supplied Hilux gallery photographs are hosted as public image assets and referenced directly by the site.
- The 3D viewer is click-to-load so it does not delay the first mobile screen.
- The quote form creates a prefilled WhatsApp enquiry; the site does not store customer data.
- Ask Mash is a guided FAQ assistant, not yet a connected generative AI agent.

## Business details
- Address: 1 Liverpool Road, Belmont, Bulawayo, Zimbabwe
- Phone / WhatsApp: 078 511 7127 and 071 255 2130
- Email: mashrestoration@gmail.com
- Hours: Monday–Friday, 08:00–17:00

## Media delivery
The production pages load the supplied original logo, hero GIF and Hilux photographs from the image CDN. The optional `mash-restoration-final-media-pack.zip` is an archival/local-copy bundle containing the same logo, GIF, optimized gallery sprite and 11 original Hilux photos. It is not required for the live site.

## Interactive 3D attribution and licensing
The supplied 2017 Ford F-150 Raptor archive contains a CC BY-NC-SA 4.0 non-commercial licence and is not suitable for a commercial workshop website. The interactive showcase therefore uses a separate Ford F-150 Raptor 2008–2014 model by Merc_TV under CC BY 4.0, with attribution and links to its source and licence. [Model source](https://sketchfab.com/3d-models/ford-f-150-raptor-2008-2014-0ed826c3da6d48ed880915bf8b4d6185) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The model is illustrative and is not presented as a Mash customer vehicle.

## Deploy
Vercel project: `mash-restoration-panel-beaters`. Static site, no build command, root output. Clean restoration routes are configured in `vercel.json`.
