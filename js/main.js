(function(storyContent) {

    var story = new inkjs.Story(storyContent);

    var storyContainer = document.querySelectorAll('.app')[0];
    var choicesContainer = document.querySelectorAll('.phone-container')[0];

    startGame();
    


    function startGame() {
        $( "body" ).on( "click", ".message", function( event ) {
            $(".introduction").css("display","none");
            $(".message").css("display", "none");
            $(".avatar").css("display", "block")
            $(".contact-name").text("Louise");
            $(".app").show(200);
            continueStory();
        });

    }

    function scrollToBottom() {
        var myDiv = $(".app");
        myDiv.animate({ scrollTop: myDiv.prop("scrollHeight") - myDiv.height() }, 800);
    }

    function continueStory() {

        // Generate story text - loop through available content
        while(story.canContinue) {

            // Get ink to generate the next paragraph
            var paragraphText = story.Continue();

            // Create paragraph element
            var paragraphElement = document.createElement('div');
            paragraphElement.className = 'recipient';
            paragraphElement.innerHTML = paragraphText;
            storyContainer.appendChild(paragraphElement);
        }

        // Create HTML choices from ink choices
        story.currentChoices.forEach(function(choice) {

            // Create paragraph with anchor element
            var choiceParagraphElement = document.createElement('div');
            choiceParagraphElement.classList.add("choices");
            choiceParagraphElement.setAttribute("id", choice.index);
            choiceParagraphElement.innerHTML = choice.text;
            choicesContainer.appendChild(choiceParagraphElement);

            // Click on choice
            var choiceAnchorEl = choiceParagraphElement;
            choiceAnchorEl.addEventListener("click", function(event) {

                // Don't follow <a> link
                event.preventDefault();

                var paragraphElement = document.createElement('div');
                paragraphElement.className = 'sender';
                paragraphElement.innerHTML = choice.text;
                storyContainer.appendChild(paragraphElement);

                // Remove all existing choices
                var existingChoices = choicesContainer.querySelectorAll('.choices');
                for(var i=0; i<existingChoices.length; i++) {
                    var c = existingChoices[i];
                    c.parentNode.removeChild(c);
                }

                // Tell the story where to go next
                story.ChooseChoiceIndex(choice.index);
				scrollToBottom();
                // Aaand loop
                var delai = setTimeout(continueStory, 1000);
            });
        });

        scrollToBottom();
    }



})(storyContent);