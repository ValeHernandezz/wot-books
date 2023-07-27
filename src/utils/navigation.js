// Capturo el evento sólo si el navegador soporta la API (View Transition API)
const checkIsNavigationSupported = () => {
  return Boolean(document.startViewTransition);
};

const fetchPage = async (url) => {
  // Cargar la página de destino utilizando un fetch para obtener el HTML
  const response = await fetch(url); // Se obtiene: /el-ojo-del-mundo

  const text = await response.text();

  // Quiero quedarme con el contenido del HTML dentro de la etiqueta body.
  // Para eso utilizo regex para extraerlo.
  const [, data] = text.match(/<body>([\s\S]*)<\/body>/i);
  return data
};

export const startViewTransition = () => {
  if (!checkIsNavigationSupported()) return;

  window.navigation.addEventListener("navigate", (event) => {
    const toUrl = new URL(event.destination.url);

    // Si es una página externa, se ignora
    if (location.origin !== toUrl.origin) return;

    // Si es una navegación en el mismo dominio (origen)
    event.intercept({
      async handler() {
        const data = await fetchPage(toUrl.pathname)
        // Utilizo la API de View Transition API
        document.startViewTransition(() => {
          // Inserto el código HTML anteriormente capturado
          document.body.innerHTML = data;
          // Hago que el scroll esté hacia arriba del todo
          document.documentElement.scrollTop = 0;
        });
      }
    });
  });
};