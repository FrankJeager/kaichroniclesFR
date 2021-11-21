import { translations, state, routing, mainMenuController } from "..";

export const mainMenuView = {

    /**
     * Main menu view
     */
    setup( ) {
        document.title = translations.text("kaiChronicles");

        // TODO: Use translation on mainMenu.html instead of this ?
        if ( state.language === "es" ) {
            $("#menu-translate").text("English");
        } else {
            $("#menu-translate").text("Español");
        }

        $("#menu-continue").click((e) => {
            e.preventDefault();
            routing.redirect("setup");
        });
        $("#menu-new").click((e) => {
            e.preventDefault();
            routing.redirect("newGame");
        });
        $("#menu-load").click((e) => {
            e.preventDefault();
            routing.redirect("loadGame");
        });
        $("#menu-translate").click((e) => {
            e.preventDefault();
            mainMenuController.changeTranslation();
        });
        $("#menu-color-theme").click((e) => {
            e.preventDefault();
            mainMenuController.changeColor();
        });
        $("#menu-faq").click((e) => {
            e.preventDefault();
            routing.redirect("faq");
        });
        $("#menu-privacy").click((e) => {
            e.preventDefault();
            routing.redirect("privacy");
        });

        // Download books (only for app)
        const $downloadBooksBtn = $("#menu-downloadbooks");
        // Switch this to test the "Download books" view with the web browser
        // if( true ) {
        $downloadBooksBtn.hide();
    },

    /**
     * Hide web text info
     */
    hideWebInfo() {
        $("#menu-webinfo").hide();
    },

    /**
     * Hide the continue game button
     */
    hideContinueGame() {
        $("#menu-continue").hide();
    }

};
