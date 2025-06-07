// js/app.js

// DOM Elements
const createPostInput = document.querySelector('.post-input');
const postOptions = document.querySelectorAll('.post-option');
const postBtn = document.querySelector('.post-btn');
const feedContainer = document.querySelector('.feed');
const storiesContainer = document.querySelector('.stories');

// Mock data for stories
const stories = [
    {
        id: 1,
        image: 'static/images/pessoa_chao.jpg',
        title: 'Nova Coleção!!',
        views: 120,
        duration: 5000
    },
    {
        id: 2,
        image: 'static/images/estilo.jpg',
        title: 'style',
        views: 85,
        duration: 5000
    },
    {
        id: 3,
        image: 'static/images/sobretudo.jpg',
        title: 'Tendências',
        views: 150,
        duration: 5000
    },
    {
        id: 4,
        image: 'static/images/garimpo.jpg',
        title: 'Dia de garimpo!',
        views: 95,
        duration: 5000
    }
];

// Mock data for posts
const posts = [
    {
        id: 1,
        user: {
            name: 'Brechó da Ana',
            avatar: 'static/images/Ana.jpg',
            username: '@brechodaAna'
        },
        content: 'Nova jaqueta jeans vintage disponível! Tamanho M. Aproveite! #brecho #moda #vintage',
        image: 'static/images/Jaqueta.jpg',
        price: 'R$ 59,90',
        size: 'M',
        likes: 42,
        comments: 5,
        timestamp: '2h atrás',
        liked: false
    },
    {
        id: 2,
        user: {
            name: 'Vic Chic',
            avatar: 'static/images/Vic.jpg',
            username: '@Vic_Chic'
        },
        content: 'Tênis nike em promoção! Só hoje por R$ 80,00. #promoção #tenis',
        image: 'static/images/tenis.jpg',
        price: 'R$ 80,00',
        size: '40',
        likes: 28,
        comments: 3,
        timestamp: '4h atrás',
        liked: false
    }
];

// Mock data for trending topics
const mockTrending = [
    { tag: '#WebDev', count: '1.2k posts' },
    { tag: '#JavaScript', count: '800 posts' },
    { tag: '#React', count: '500 posts' }
];

// Mock data for suggestions
const mockSuggestions = [
    { username: 'techguru', name: 'Tech Guru', image: 'https://via.placeholder.com/40' },
    { username: 'codeartist', name: 'Code Artist', image: 'https://via.placeholder.com/40' },
    { username: 'webmaster', name: 'Web Master', image: 'https://via.placeholder.com/40' }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing app...');
    loadStories();
    loadPosts();
    setupEventListeners();
    setupInfiniteScroll();
});

// Load stories
function loadStories() {
    console.log('Loading stories...');
    if (!storiesContainer) {
        console.error('Stories container not found!');
        return;
    }
    
    storiesContainer.innerHTML = stories.map(story => `
        <div class="story-item" onclick="viewStory(${story.id})">
            <img src="${story.image}" alt="${story.title}">
            <h4>${story.title}</h4>
            <div class="story-views">
                <i class="fas fa-eye"></i>
                <span>${story.views}</span>
            </div>
        </div>
    `).join('');
}

// Load posts
function loadPosts() {
    console.log('Loading posts...');
    if (!feedContainer) {
        console.error('Feed container not found!');
        return;
    }
    
    feedContainer.innerHTML = posts.map(post => `
        <div class="post fade-in" data-post-id="${post.id}">
            <div class="post-header">
                <img src="${post.user.avatar}" alt="${post.user.name}" class="profile-pic">
                <div class="post-user-info">
                    <h4>${post.user.name}</h4>
                    <span class="username">${post.user.username}</span>
                    <span class="timestamp">${post.timestamp}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${formatPostContent(post.content)}</p>
                ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image" loading="lazy">` : ''}
                <div class="post-details">
                    ${post.price ? `<div class="post-price"><i class="fas fa-tag"></i> ${post.price}</div>` : ''}
                    ${post.size ? `<div class="post-size"><i class="fas fa-ruler"></i> ${post.size}</div>` : ''}
                </div>
            </div>
            <div class="post-actions">
                <div class="post-action like-action ${post.liked ? 'liked' : ''}" onclick="handleLike(${post.id})">
                    <i class="${post.liked ? 'fas' : 'far'} fa-heart"></i>
                    <span>${post.likes}</span>
                </div>
                <div class="post-action comment-action" onclick="handleComment(${post.id})">
                    <i class="far fa-comment"></i>
                    <span>${post.comments}</span>
                </div>
                <div class="post-action share-action" onclick="handleShare(${post.id})">
                    <i class="far fa-share-square"></i>
                </div>
                <div class="post-action buy-action" onclick="handleBuy(${post.id})">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Comprar</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Format post content with hashtags and mentions
function formatPostContent(content) {
    return content
        .replace(/#(\w+)/g, '<a href="#" class="hashtag">#$1</a>')
        .replace(/@(\w+)/g, '<a href="#" class="mention">@$1</a>');
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Post input focus
    if (createPostInput) {
        createPostInput.addEventListener('focus', () => {
            createPostInput.style.borderColor = 'var(--primary-color)';
        });

        createPostInput.addEventListener('blur', () => {
            createPostInput.style.borderColor = 'var(--border-color)';
        });
    }

    // Post options
    postOptions.forEach(option => {
        option.addEventListener('click', () => {
            const type = option.dataset.type;
            handlePostOption(type);
        });
    });

    // Create post
    if (postBtn) {
        postBtn.addEventListener('click', createPost);
    }

    // Prevent default link behavior
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });
}

// Handle post options
function handlePostOption(type) {
    switch(type) {
        case 'photo':
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        createPostInput.value += `\n[Imagem: ${file.name}]`;
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
            break;
        case 'price':
            const price = prompt('Digite o preço do produto:');
            if (price) {
                createPostInput.value += `\nPreço: ${price}`;
            }
            break;
        case 'size':
            const size = prompt('Digite o tamanho do produto:');
            if (size) {
                createPostInput.value += `\nTamanho: ${size}`;
            }
            break;
    }
}

// Create new post
function createPost() {
    const content = createPostInput.value.trim();
    if (!content) return;

    const newPost = {
        id: posts.length + 1,
        user: {
            name: 'Você',
            avatar: 'static/images/OL.png',
            username: '@seuusuario'
        },
        content: content,
        likes: 0,
        comments: 0,
        timestamp: 'Agora mesmo',
        liked: false
    };

    posts.unshift(newPost);
    createPostInput.value = '';
    loadPosts();
}

// Handle post interactions
function handleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        loadPosts();
    }
}

function handleComment(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        const comment = prompt('Digite seu comentário:');
        if (comment) {
            post.comments++;
            loadPosts();
        }
    }
}

function handleShare(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        if (navigator.share) {
            navigator.share({
                title: 'Compartilhar produto',
                text: post.content,
                url: window.location.href
            });
        } else {
            alert('Compartilhando produto...');
        }
    }
}

function handleBuy(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        alert('Produto adicionado ao carrinho!');
    }
}

// View story
function viewStory(storyId) {
    const story = stories.find(s => s.id === storyId);
    if (story) {
        const modal = document.createElement('div');
        modal.className = 'story-modal';
        modal.innerHTML = `
            <div class="story-content">
                <img src="${story.image}" alt="${story.title}">
                <div class="story-info">
                    <h3>${story.title}</h3>
                    <div class="story-stats">
                        <span><i class="fas fa-eye"></i> ${story.views}</span>
                    </div>
                </div>
                <button class="close-story">&times;</button>
                <div class="story-progress">
                    <div class="story-progress-bar"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const progressBar = modal.querySelector('.story-progress-bar');
        progressBar.style.animation = `storyProgress ${story.duration}ms linear`;
        
        modal.querySelector('.close-story').addEventListener('click', () => {
            modal.remove();
        });
        
        setTimeout(() => {
            modal.remove();
        }, story.duration);
    }
}

// Setup infinite scroll
function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            loadMorePosts();
        }
    });
}

// Load more posts
function loadMorePosts() {
    // Simulate loading more posts
    const newPosts = [
        {
            id: posts.length + 1,
            user: {
                name: 'brechó_jpeg',
                avatar: 'static/images/Cara_Perfil.jpg',
                username: '@brecho_jpeg'
            },
            content: 'Novo estoque chegou! Venha conferir as novidades. #brecho #novidades',
            image: 'static/images/novidades.jpg',
            price: 'R$ 0,00',
            size: 'não informado',
            likes: 15,
            comments: 2,
            timestamp: '6h atrás',
            liked: false
        },  
        {
            id: posts.length + 2,
            user: {
                name: 'Brechó da Ana',
            avatar: 'static/images/Ana.jpg',
            username: '@brechodaAna'
        },
        content: 'Tênis nike em promoção! Só hoje por R$ 80,00. #promoção #tenis',
        image: 'static/images/tenis.jpg',
        price: 'R$ 80,00',
        size: '40',
        likes: 28,
        comments: 3,
        timestamp: '4h atrás',
        liked: false
        }
    ];
    
    posts.push(...newPosts);
    loadPosts();
}

// Make functions available globally
window.viewStory = viewStory;
window.handleLike = handleLike;
window.handleComment = handleComment;
window.handleShare = handleShare;
window.handleBuy = handleBuy;