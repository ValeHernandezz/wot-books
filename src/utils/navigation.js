// Capturo el evento sólo si el navegador soporta la API (View Transition API)
const checkIsNavigationSupported = () => {
  return Boolean(document.startViewTransition);
};

const fetchPage = async (url) => {
  const response = await fetch(url)

  const text = await response.text()

  const data = text.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1]
  return data
}

// const fetchPage = async (url) => {
//   // Cargar la página de destino utilizando un fetch para obtener el HTML
//   const response = await fetch(url); // Se obtiene: /el-ojo-del-mundo

//   const text = await response.text();

//   // Quiero quedarme con el contenido del HTML dentro de la etiqueta body.
//   // Para eso utilizo regex para extraerlo.
//   const [, data] = text.match(/<body>([\s\S]*)<\/body>/i);
//   return data
// };

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
          // document.body.innerHTML = data;
          updatePageContent(data)
          // Hago que el scroll esté hacia arriba del todo
          document.documentElement.scrollTop = 0;
        });
      }
    });
  });
};

const updatePageContent = (data) => {
  // Crear un elemento temporal para analizar el contenido recibido
  const tempElement = document.createElement("div");
  tempElement.innerHTML = data;

  // Actualizar solo las partes relevantes de la página, por ejemplo, un contenedor específico
  const contentContainer = document.getElementById("content");
  if (contentContainer) {
    contentContainer.innerHTML = tempElement.querySelector("#content").innerHTML;
  } else {
    console.warn("No se encontró el contenedor de contenido en la página.");
  }
};