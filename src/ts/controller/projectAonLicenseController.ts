import { translations, views } from "..";

/**
 * Project Aon license controller
 */
export const projectAonLicenseController = {

    index() {
        document.title = translations.text("projectAonLicense");
        // There is no traslations of the license, so, english:
        void views.loadView("projectAonLicense.html");
    }

};
