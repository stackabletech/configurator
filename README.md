# Stackable Configurator

This project is using [Svelte](https://svelte.dev).

## Get started

Install the dependencies...

```bash
npm install
```
Update .env file (use the `.env.example` as an example)

```bash
VITE_API_URL= http://localhost:5173/data/configurator-data.json
VITE_IMAGES_BASE_URL= http://localhost:5173/images/
```

* VITE_API_URL: Where the data file is saved.
* VITE_IMAGES_BASE_URL: Base URL for technologies logos.

Update JSON file and upload logos to the ´images´ folder:

```bash
cd public/data
touch configurator-data.json

```
This file works as a database for the configurator data.
You can also upload the file to a remote server, then update `API_URL` inside the `.env` file.

...then start [Vite](https://vite.dev/):

```bash
npm run dev
```

Navigate to [localhost:5173](http://localhost:5173). You should see your app running.
Edit a component file in `src`, save it, and reload the page to see your changes.

## Building and running in production mode

Adjust environment variables `.env` for production.

Build the app using this command:

```bash
npm run build
```

## Deploying to WordPress project:

1. Upload the files to the WordPress server.
In our case, we created a folder `configurator` inside the active theme folder.

2. Update `functions.php` (in the active theme folder, e.g. `wp-content/themes/stratusx-child/functions.php`) to inject CSS and JS with WordPress hook `wp_enqueue_script`.

```bash
// Configurator assets
function stackable_configurator_scripts()
{
	wp_enqueue_style( 'google-fonts-roboto', get_stylesheet_directory_uri() . '/stackable-gfonts.css', false, time() );
	wp_enqueue_style('svelte-configurator-styles', '/configurator/build-2025/assets/index-BXDNrEKi.css', '',time(), false);
	wp_enqueue_script_module('svelte-configurator-js', '/configurator/build-2025/assets/index-BEGEifxe.js');
}
add_action('wp_enqueue_scripts', 'stackable_configurator_scripts');
```

Important: Make sure to update the filenames used!
Vite builds CSS and JS files with a unique hash (`index-XXXXXXXX.js`) in the name. This is so that files can be cached but we can still react to changes immediately.

3. Add `<div class="stackable-configurator-app"></div>` to show the configurator in any page. We did this using a custom Elementor element.
