// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const editProfileBtn = document.querySelector('.edit-profile-btn');
const editAvatarBtn = document.querySelector('.edit-avatar');
const editCoverBtn = document.querySelector('.edit-cover');
const photosGrid = document.querySelector('.photos-grid');

// Mock data for user posts
const userPosts = [
    {
        id: 1,
        content: 'Acabei de lançar meu novo projeto! 🚀 #coding #webdev',
        image: '../static/images/ok.jpg',
        likes: 42,
        comments: 5,
        timestamp: '2h atrás'
    },
    {
        id: 2,
        content: 'Dia perfeito para programar! ☕️ #coding #javascript',
        image: '../static/images/D.webp',
        likes: 28,
        comments: 3,
        timestamp: '4h atrás'
    }
];

// Initialize the profile page
function init() {
    setupTabNavigation();
    loadUserPosts();
    setupEventListeners();
}

// Setup tab navigation
function setupTabNavigation() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show selected tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// Load user posts
function loadUserPosts() {
    const postsGrid = document.querySelector('.posts-grid');
    postsGrid.innerHTML = userPosts.map(post => `
        <div class="post" data-post-id="${post.id}">
            <div class="post-header">
                <img src="../static/images/OL.png" alt="Profile" class="profile-pic">
                <div>
                    <h4>Nome do Usuário</h4>
                    <span class="timestamp">${post.timestamp}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            </div>
            <div class="post-actions">
                <div class="post-action like-action" onclick="handleLike(${post.id})">
                    <i class="far fa-heart"></i>
                    <span>${post.likes}</span>
                </div>
                <div class="post-action comment-action" onclick="handleComment(${post.id})">
                    <i class="far fa-comment"></i>
                    <span>${post.comments}</span>
                </div>
                <div class="post-action share-action" onclick="handleShare(${post.id})">
                    <i class="far fa-share-square"></i>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Edit profile button
    editProfileBtn.addEventListener('click', () => {
        const newName = prompt('Digite seu novo nome:');
        const newBio = prompt('Digite sua nova biografia:');
        
        if (newName) {
            document.querySelector('.profile-details h1').textContent = newName;
        }
        if (newBio) {
            document.querySelector('.bio').textContent = newBio;
        }
    });

    // Edit avatar button
    editAvatarBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    document.querySelector('.profile-avatar img').src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });

    // Edit cover button
    editCoverBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    document.querySelector('.profile-cover img').src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });

    // Photo grid click handler
    photosGrid.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            showFullImage(e.target.src);
        }
    });
}

// Show full image in modal
function showFullImage(src) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <img src="${src}" alt="Full size">
            <button class="close-modal">&times;</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Post interaction handlers
function handleLike(postId) {
    const post = userPosts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        loadUserPosts();
    }
}

function handleComment(postId) {
    const comment = prompt('Digite seu comentário:');
    if (comment) {
        const post = userPosts.find(p => p.id === postId);
        if (post) {
            post.comments++;
            loadUserPosts();
        }
    }
}

function handleShare(postId) {
    // Implement share functionality
    alert('Compartilhando post...');
}

// Add modal styles
const style = document.createElement('style');
style.textContent = `
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .modal-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }
    
    .close-modal {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }
`;
document.head.appendChild(style);

// Initialize the profile page when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);

window.initProfilePage = function() {
    setupTabNavigation();
    loadUserPosts();
    setupEventListeners();
}; 