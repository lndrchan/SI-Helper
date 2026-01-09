// Initialize current phase index
// 0: Spirit phase
// 1: Fast power
// 2: Blight
// 3: Event
// 4: Fear
// 5: Invader
// 6: Slow power

let phase = 0;
let activeListItemClass = 'list-group-item-dark';

let phaseList = null;
let phaseListLength = 0;

let fearProgress = null;
let fearBadge = null;
let fear = 0;
let earnedFearCards = 0;
let fearMax = 8;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {

    phaseList = document.querySelectorAll('.list-group-item');
    fearProgress = document.getElementById('fear-progress');

    // Highlight the first phase on page load
    if (phaseList.length > 0) {
        setPhase(0);
        phaseListLength = phaseList.length;
    }
    if (fearProgress) {

    }

    // Add click handler to the button
    nextPhaseBtn = document.getElementById('btn-next-phase');
    if (nextPhaseBtn) {
        nextPhaseBtn.addEventListener('click', nextPhase);
    }

    addFearBtn = document.getElementById('btn-add-fear');
    console.log(addFearBtn);
    if (addFearBtn) {
        addFearBtn.addEventListener('click', addFear);
    }
});


// Add click handler to the button
function nextPhase() {
    setPhase((phase + 1) % phaseListLength);

    // Optional: Log the current phase name for debugging
    const currentPhaseName = phaseList[phase].querySelector('.phase-list-title').textContent;
    console.log('Current Phase:', currentPhaseName);

    // Check if we're at phase index 4 (Events phase)
    if (phase === 3) {
        drawCard('event');
    }
    else if (phase === 4) {
        drawCard('fear');
    }
}

function addFear() {
    fear ++;
    console.log('Current fear: ' + fear);

    if (fear >= fearMax || fear < 0) {
        fear = 0;
    }
    if (fear === fearMax) {

    }

    fearProgress.setAttribute('style', 'width: ' + fear / fearMax * 100 + '%');
    fearProgress.innerHTML = fear + ' / ' + fearMax;
}

function removeFear() {
    fear --;

    if (fear < 0) {
        return;
    }

    fearProgress.setAttribute('aria-valuenow', fear);
}

function earnFearCard() {
    earnedFearCards ++;

}

// Function to draw and display a random card
function drawCard(type) {
    // Get the card display div
    const cardDisplay = document.getElementById('main-card-display');

    if (cardDisplay) {
        // Create image element
        const img = document.createElement('img');
        random = 0;

        switch (type)
        {
            case 'fear':
                random = Math.floor(Math.random() * 51);
                img.src = `/static/assets/fear/${random}.png`;
                break;
            case 'event':
                random = Math.floor(Math.random() * 58);
                img.src = `/static/assets/event/${random}.png`;
                break;
        }

        img.className = 'game-card';

        // Clear previous content and add new image
        cardDisplay.innerHTML = '';
        cardDisplay.appendChild(img);

        console.log(`Drew ${type} card: ${random}.png`);
    }
}

// Function to set phase programmatically
function setPhase(index) {
    phaseList[phase].classList.remove(activeListItemClass);
    if (index >= 0 && index < phaseListLength)
        phase = index;
    else
        phase = 0;
    phaseList[phase].classList.add(activeListItemClass);
}
