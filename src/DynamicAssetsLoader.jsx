import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function loadAsset(url, type) {
  return new Promise((resolve, reject) => {
    let element;
    if (type === "css") {
      element = document.createElement("link");
      element.rel = "stylesheet";
      element.href = url;
      element.onload = resolve;
      element.onerror = reject;
      document.head.appendChild(element);
    } else if (type === "js") {
      element = document.createElement("script");
      element.src = url;
      element.onload = resolve;
      element.onerror = reject;
      document.body.appendChild(element);
    }
  });
}

const loadPluginAssets = async () => {
  const plugins = [
    "toastr.init.js",
    "amchart-init.js",
    "block-ui-init.js",
    "bootstrap-duallistbox-init.js",
    "bootstrap-editable-init.js",
    "bootstrap-multiselect-init.js",
    "bootstrap-notify-init.js",
    "bootstrap-select-init.js",
    "bootstrap-tagsinput-init.js",
    "bootstrap-touchpin-init.js",
    "bs-date-picker-init.js",
    "bs-daterange-picker-init.js",
    "c3-init.js",
    "chart-google-init.js",
    "chartist.init.js",
    "chartjs-init.js",
    "chartjs-plugin-datalabels-init.js",
    "chartjs-streaming-init.js",
    "chartjs-widget-init.js",
    "circle-invoice-init.js",
    "circle-progress-init.js",
    "clipboard-init.js",
    "clock-picker-init.js",
    "color-picker-init.js",
    "counterup-init.js",
    "cropperjs-init.js",
    "croppie-init.js",
    "datamap-init.js",
    "datamap-usa-init.js",
    "datamap-world-init.js",
    "datatable-page-contact-init.js",
    "datatables.init (Saiful Islam's conflicted copy 2018-10-28).js",
    "datatables.init.js",
    "datedropper-init.js",
    "dragula-init.js",
    "dropify-init.js",
    "easy-pie-chart-init.js",
    "echarts-init.js",
    "editor-ck-init.js",
    "editor-tinymice-init.js",
    "email-editor-init.js",
    "footable-init.js",
    "form-bootstrap-validate-init.js",
    "form-pickers-init.js",
    "fullcalendar-init.js",
    "highcharts-init.js",
    "icheck.init.js",
    "jquery.bootgrid-init.js",
    "jquery.flot.init.js",
    "jquery.validate-init.js",
    "jquery-asColorPicker.init.js",
    "jquery-countto-init.js",
    "jquery-steps-init.js",
    "jqvmap-init.js",
    "jsgrid-init.js",
    "jstree-init.js",
    "justgage.init.js",
    "knob.init.js",
    "magnific-popup-init.js",
    "material-date-picker-init.js",
    "morris-init.js",
    "nestable.init.js",
    "nouislider-init.js",
    "nouislider-ticket-init.js",
    "owl-carousel-init.js",
    "peitychart.init.js",
    "pickadate-init.js",
    "pickatime-init.js",
    "pignose.init.js",
    "pricint-switch-init.js",
    "quill-init.js",
    "repeater-init.js",
    "rickshaw-init.js",
    "select2-init.js",
    "shepherd-init.js",
    "smartwizard-init.js",
    "sparkline.init.js",
    "summernote-init.js",
    "sweetalert.init.js",
    "switchery-init.js",
  ];

  try {
    await Promise.all(
      plugins.map((plugin) =>
        loadAsset(`/admin/js/plugins-init/${plugin}`, "js")
      )
    );
  } catch (error) {
    console.error("Failed to load plugin assets", error);
  }
};

const DynamicAssetLoader = () => {
  const location = useLocation();

  useEffect(() => {
    const basePath = location.pathname.split("/")[1];

    if (basePath !== "admin" && basePath !== "seller") return;

    const loadAssets = async () => {
      const assetsToLoad = [
        { url: `/admin/css/style.css`, type: "css" },
        { url: `/admin/js/dashboard/dashboard-1.js`, type: "js" },
        { url: `/admin/js/custom.min.js`, type: "js" },
        { url: `/admin/js/gleek.js`, type: "js" },
        { url: `/admin/js/settings.js`, type: "js" },
        { url: `/admin/js/styleSwitcher.js`, type: "js" },
      ];

      try {
        await Promise.all(
          assetsToLoad.map((asset) => loadAsset(asset.url, asset.type))
        );
        await loadPluginAssets();
      } catch (error) {
        console.error("Failed to load assets", error);
      }
    };

    loadAssets();

    return () => {
      document
        .querySelectorAll(`link[href*="admin"], script[src*="admin"]`)
        .forEach((element) => {
          try {
            if (
              element.tagName === "LINK" &&
              element.parentNode === document.head
            ) {
              document.head.removeChild(element);
            } else if (
              element.tagName === "SCRIPT" &&
              element.parentNode === document.body
            ) {
              document.body.removeChild(element);
            }
          } catch (cleanupError) {
            console.error("Error during cleanup of assets", cleanupError);
          }
        });
    };
  }, [location]);

  return null;
};

export default DynamicAssetLoader;
