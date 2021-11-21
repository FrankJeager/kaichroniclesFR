import { setupController, translations, views, state, Book, Section, SectionRenderer, mechanicsEngine } from "..";

/**
 * About the book controller
 */
export const aboutController = {

    /**
     * Render the about page
     */
    index() {

        if ( !setupController.checkBook() ) {
            return;
        }

        document.title = translations.text( "about" );
        views.loadView("about.html")
        .then(() => {

            // Get all metadata about the book:
            $("#about-title").text( state.book.getBookTitle() );
            $("#about-copyright").append( state.book.getCopyrightHtml() );
            aboutController.appendSection( "dedicate" , "#about-dedication" );
            aboutController.appendSection( "acknwldg" , "#about-content" );
            $("#about-cover").attr("src" , state.book.getCoverURL() );

             // Download and show authors info, if it's available (only from v 1.8 generated zip book files)
            try {
                const promises = state.book.downloadAuthorsBio();
                // Wait downloads and the HTML of each one
                for ( const promise of promises) {
                    promise.then((xml: string) => {
                        xml = Book.fixXml(xml);
                        xml = "<div><p>" + xml + "</p></div>";
                        this.authorInfoDownloaded(xml);
                    });
                }
            } catch (ex) {
                mechanicsEngine.debugWarning(ex);
            }
        });
    },

    /**
     * Append an author biography to the about page
     * @param authorInfoXml The author biography XML
     */
    authorInfoDownloaded(authorInfoXml: string) {

        // Show the about authors title
        const $authorsWrapper = $("#about-authors-wrapper");
        $authorsWrapper.show();

        // Append the author biography
        const fakeSection = Section.createFromXml( state.book , $(authorInfoXml) );
        const renderer = new SectionRenderer(fakeSection);
        $authorsWrapper.append( renderer.renderSection() );
    },

    appendSection(sectionId: string, containerId: string) {
        const section = new Section( state.book , sectionId , state.mechanics );
        const renderer = new SectionRenderer( section );
        $(containerId).append( renderer.renderSection() );
    },

    /** Return page */
    getBackController(): string { return "settings"; }

};
