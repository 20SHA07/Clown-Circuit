/**
 * Clown Circuit - Intentionally Bad JavaScript
 * This script adds chaotic functionality to our already terrible UI
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("🤡 Welcome to the Clown Circuit JavaScript Chaos! 🤡");
    
    // Initialize all the chaotic features
    initMovingButtons();
    initVolumeIncrease();
    initInfiniteScroll();
    initRandomRotations();
    initSpinningElements();
    
    // Add some extra chaos
    setInterval(changeRandomColors, 5000);
});

/**
 * Moving Buttons - Makes buttons run away from the cursor
 */
function initMovingButtons() {
    const movingButtons = document.querySelectorAll('.moving-button');
    
    movingButtons.forEach(button => {
        button.addEventListener('mouseover', function(e) {
            // Calculate a random position within the viewport
            const maxX = window.innerWidth - this.offsetWidth;
            const maxY = window.innerHeight - this.offsetHeight;
            
            // Generate random positions but ensure the button stays within view
            const randomX = Math.max(0, Math.min(maxX, Math.random() * maxX));
            const randomY = Math.max(0, Math.min(maxY, Math.random() * maxY));
            
            // Apply the new position
            this.style.position = 'fixed';
            this.style.left = randomX + 'px';
            this.style.top = randomY + 'px';
            this.style.zIndex = '1000';
            
            // Add a silly message
            const messages = [
                "Can't catch me!",
                "Too slow!",
                "Haha, missed me!",
                "Try again, clown!",
                "Whoops! I moved!"
            ];
            
            // Create a floating message
            const message = document.createElement('div');
            message.textContent = messages[Math.floor(Math.random() * messages.length)];
            message.style.position = 'fixed';
            message.style.left = (e.clientX + 10) + 'px';
            message.style.top = (e.clientY - 20) + 'px';
            message.style.backgroundColor = 'rgba(255, 255, 0, 0.8)';
            message.style.color = '#ff00ff';
            message.style.padding = '5px 10px';
            message.style.borderRadius = '10px';
            message.style.fontWeight = 'bold';
            message.style.zIndex = '1001';
            message.style.pointerEvents = 'none';
            
            document.body.appendChild(message);
            
            // Remove the message after a short delay
            setTimeout(() => {
                document.body.removeChild(message);
            }, 1500);
        });
        
        // Return button to normal when clicked
        button.addEventListener('click', function() {
            this.style.position = '';
            this.style.left = '';
            this.style.top = '';
            this.style.zIndex = '';
            
            // Show a congratulatory message
            alert("Wow! You actually caught the button! 🎪 Achievement unlocked: Clown Catcher! 🎯");
        });
    });
}

/**
 * Volume Increase - Makes audio elements gradually increase in volume
 */
function initVolumeIncrease() {
    const audioElements = document.querySelectorAll('audio[data-volume-increase="true"]');
    
    audioElements.forEach(audio => {
        // Start with a very low volume
        audio.volume = 0.1;
        
        // Increase volume over time when playing
        audio.addEventListener('play', function() {
            // Clear any existing interval
            if (this.volumeInterval) {
                clearInterval(this.volumeInterval);
            }
            
            // Create a new interval to increase volume
            this.volumeInterval = setInterval(() => {
                if (this.volume < 1) {
                    this.volume += 0.01;
                    console.log(`Volume increased to: ${this.volume.toFixed(2)}`);
                } else {
                    clearInterval(this.volumeInterval);
                }
            }, 1000); // Increase every second
        });
        
        // Stop the volume increase when paused
        audio.addEventListener('pause', function() {
            if (this.volumeInterval) {
                clearInterval(this.volumeInterval);
            }
            // Reset volume to low
            this.volume = 0.1;
        });
        
        // Also stop on ended
        audio.addEventListener('ended', function() {
            if (this.volumeInterval) {
                clearInterval(this.volumeInterval);
            }
            // Reset volume to low
            this.volume = 0.1;
        });
    });
}

/**
 * Infinite Scroll - Creates an endless stream of clown content
 */
function initInfiniteScroll() {
    const scrollContainer = document.getElementById('infinite-scroll-container');
    const scrollContent = scrollContainer.querySelector('.scroll-content');
    
    // Clone the initial items
    const initialItems = Array.from(scrollContent.children);
    
    // Function to add more items
    function addMoreItems() {
        // Clone all initial items
        initialItems.forEach(item => {
            const clone = item.cloneNode(true);
            
            // Add some randomness to the clone
            clone.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
            
            // Add to the container
            scrollContent.appendChild(clone);
        });
    }
    
    // Add initial batch of clones
    addMoreItems();
    addMoreItems();
    
    // Monitor scrolling to add more items when needed
    scrollContent.addEventListener('scroll', function() {
        const scrollRight = this.scrollLeft + this.clientWidth;
        
        // If we're near the end, add more items
        if (scrollRight > this.scrollWidth - 300) {
            addMoreItems();
            console.log("Added more clowns to the infinite parade!");
        }
    });
    
    // Auto-scroll to create the illusion of infinity
    let scrollPosition = 0;
    setInterval(() => {
        scrollPosition += 1;
        scrollContent.scrollLeft = scrollPosition;
        
        // Reset if we've scrolled too far (prevents numbers getting too large)
        if (scrollPosition > 10000) {
            // Jump back but keep the appearance of continuity
            scrollPosition = 5000;
            scrollContent.scrollLeft = scrollPosition;
        }
    }, 30);
}

/**
 * Random Rotations - Randomly rotates elements for extra chaos
 */
function initRandomRotations() {
    const rotateElements = document.querySelectorAll('.clown-item, .audio-item');
    
    rotateElements.forEach(element => {
        // Set initial random rotation
        const initialRotation = Math.random() * 10 - 5; // Between -5 and 5 degrees
        element.style.transform = `rotate(${initialRotation}deg)`;
        
        // Change rotation on hover
        element.addEventListener('mouseover', function() {
            const newRotation = Math.random() * 20 - 10; // Between -10 and 10 degrees
            this.style.transform = `rotate(${newRotation}deg)`;
        });
    });
}

/**
 * Spinning Elements - Makes certain elements spin continuously
 */
function initSpinningElements() {
    const spinElements = document.querySelectorAll('.background-gif');
    
    spinElements.forEach((element, index) => {
        // Different speeds and directions for each element
        const duration = 5 + (index * 2); // 5s, 7s, 9s...
        const direction = index % 2 === 0 ? 'normal' : 'reverse';
        
        element.style.animation = `spin ${duration}s linear infinite ${direction}`;
    });
}

/**
 * Random Color Changes - Periodically changes colors of various elements
 */
function changeRandomColors() {
    // Generate a random color
    const randomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };
    
    // Change header colors
    const header = document.querySelector('.chaotic-header');
    if (header) {
        header.style.background = `linear-gradient(45deg, ${randomColor()}, ${randomColor()}, ${randomColor()})`;
    }
    
    // Change some text colors
    const headings = document.querySelectorAll('h2');
    headings.forEach(heading => {
        heading.style.color = randomColor();
    });
    
    // Change border colors
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const borderStyle = ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge'][Math.floor(Math.random() * 6)];
        section.style.borderColor = randomColor();
        section.style.borderStyle = borderStyle;
    });
    
    console.log("🎨 Colors changed for extra chaos! 🎨");
}

/**
 * Form Submission - Prevents actual submission and shows a silly message
 */
const nonsenseForm = document.getElementById('nonsense-form');
if (nonsenseForm) {
    nonsenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get the clown name
        const clownName = document.getElementById('clown-name').value || 'Anonymous Clown';
        
        // Create a silly confirmation
        const confirmationMessage = `
            🎪 CONGRATULATIONS ${clownName.toUpperCase()}! 🎪
            
            You have officially joined the Clown Circuit!
            
            Your application has been filed in our circular filing cabinet
            (that's a fancy way of saying "trash can").
            
            Please expect a response between now and the heat death of the universe.
            
            Thank you for your interest in our chaotic UI experiment!
        `;
        
        alert(confirmationMessage);
        
        // Reset the form with a flourish
        setTimeout(() => {
            nonsenseForm.reset();
        }, 1000);
    });
}