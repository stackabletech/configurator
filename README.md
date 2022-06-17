# Stackable Configurator

This project is using [Svelte](https://svelte.dev).

## Get started

Install the dependencies...

```bash
cd svelte-stackable-configurator
npm install
```
Update .env file

```bash
API_URL= http://localhost:8080/data/configurator-data.json
IMAGES_BASE_URL= http://localhost:8080/images/
```
API_URL: Where the data file is saved.
IMAGES_BASE_URL: Base URL for technologies logos.

Update JSON file and upload logos to the ´images´ folder:

```bash
cd data
touch configurator-data.json

```
This file works as a database for the configurator data.
You can also upload the file to a remote server, then update `API_URL` inside the `.env` file.

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## Building and running in production mode

Adjust environment variables `.env` for production.

```bash
API_URL= http://localhost:8080/data/configurator-data.json
IMAGES_BASE_URL= http://localhost:8080/images/
```
Build the app using this command.

```bash
npm run build
```

## Deploying to WordPress project:

1- Upload the files to the WordPress server.
In our case, we created a folder `configurator` inside the active theme folder.

2- Update `function.php` to inject CSS and JS with WordPress hook `wp_enqueue_script`.

```bash
// Configurator assets
function stackable_configurator_scripts()
{
	wp_enqueue_style( 'google-fonts-roboto', 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap', false );
	wp_enqueue_style('svelte-configurator-styles', '/configurator/build/bundle.css', '',time(), false);
	wp_enqueue_script('svelte-configurator-js', '/configurator/build/bundle.js','',time(),true);
}
add_action('wp_enqueue_scripts', 'stackable_configurator_scripts');
```

3- Add `<div class="stackable-configurator-app"></div>` to show the configurator in any page.


