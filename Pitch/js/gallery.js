// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const galleryGrid = document.querySelector('.gallery-grid');

// Initialize the gallery
function init() {
    setupFilters();
    setupUploadArea();
    setupGalleryInteractions();
}

// Setup filter functionality
function setupFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Setup upload area functionality
function setupUploadArea() {
    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = var(--primary-color);
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = var(--border-color);
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = var(--border-color);
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
}

// Handle file selection
function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

// Process selected files
function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                addNewGalleryItem(e.target.result, file.name);
            };
            
            reader.readAsDataURL(file);
        }
    });
}

// Add new gallery item
function addNewGalleryItem(imageUrl, fileName) {
    const newItem = document.createElement('div');
    newItem.className = 'gallery-item new';
    newItem.dataset.category = 'nature'; // Default category
    
    newItem.innerHTML = `
        <img src="${imageUrl}" alt="${fileName}">
        <div class="gallery-item-overlay">
            <div class="gallery-item-info">
                <h3>Nova Foto</h3>
                <p>Adicionada agora mesmo</p>
                <div class="gallery-item-actions">
                    <button class="like-btn"><i class="far fa-heart"></i> 0</button>
                    <button class="comment-btn"><i class="far fa-comment"></i> 0</button>
                    <button class="share-btn"><i class="far fa-share-square"></i></button>
                </div>
            </div>
        </div>
    `;
    
    galleryGrid.insertBefore(newItem, galleryGrid.firstChild);
}

// Setup gallery interactions
function setupGalleryInteractions() {
    galleryGrid.addEventListener('click', (e) => {
        const target = e.target;
        
        // Handle like button
        if (target.closest('.like-btn')) {
            const likeBtn = target.closest('.like-btn');
            const likeCount = likeBtn.querySelector('i').nextSibling;
            const currentLikes = parseInt(likeCount.textContent);
            likeCount.textContent = currentLikes + 1;
            likeBtn.classList.toggle('liked');
        }
        
        // Handle comment button
        if (target.closest('.comment-btn')) {
            const comment = prompt('Digite seu comentário:');
            if (comment) {
                const commentBtn = target.closest('.comment-btn');
                const commentCount = commentBtn.querySelector('i').nextSibling;
                const currentComments = parseInt(commentCount.textContent);
                commentCount.textContent = currentComments + 1;
            }
        }
        
        // Handle share button
        if (target.closest('.share-btn')) {
            // Implement share functionality
            alert('Compartilhando foto...');
        }
        
        // Handle image click for full view
        if (target.tagName === 'IMG') {
            showFullImage(target.src);
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
    
    .like-btn.liked i {
        color: #ed4956;
    }
`;
document.head.appendChild(style);

// Initialize the gallery when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 