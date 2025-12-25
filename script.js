// ChatWave - Real-Time Chat Application
// Main Application Logic

class ChatWave {
    constructor() {
        // Initialize application
        this.init();
    }

    // Initialize application
    init() {
        // State management
        this.state = {
            user: null,
            currentChat: null,
            chats: [],
            groups: [],
            users: [],
            messages: {},
            typingUsers: {},
            isOnline: true,
            emojiPickerVisible: false,
            attachmentMenuVisible: false,
            stickerPickerVisible: false
        };

        // Initialize components
        this.initializeComponents();
        this.loadSampleData();
        this.setupEventListeners();
        this.setupRealTimeSimulation();
        
        // Hide loading screen after 2 seconds
        setTimeout(() => {
            document.querySelector('.loading-screen').style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.loading-screen').style.display = 'none';
            }, 500);
        }, 2000);
    }

    // Initialize UI components
    initializeComponents() {
        // Initialize emoji picker
        this.initEmojiPicker();
        
        // Initialize stickers
        this.initStickers();
        
        // Update UI based on state
        this.updateUI();
    }

    // Load sample data
    loadSampleData() {
        // Sample users
        this.state.users = [
            {
                id: 1,
                name: "John Doe",
                username: "johndoe",
                email: "john@example.com",
                avatar: "https://ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff",
                status: "Online",
                isVerified: true,
                isOnline: true,
                lastSeen: new Date().toISOString(),
                role: "user",
                bio: "Digital creator and tech enthusiast"
            },
            {
                id: 2,
                name: "Jane Smith",
                username: "janesmith",
                email: "jane@example.com",
                avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=764ba2&color=fff",
                status: "Available",
                isVerified: true,
                isOnline: true,
                lastSeen: new Date().toISOString(),
                role: "user",
                bio: "UX Designer and frontend developer"
            },
            {
                id: 3,
                name: "Mike Johnson",
                username: "mikej",
                email: "mike@example.com",
                avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=10b981&color=fff",
                status: "Away",
                isVerified: false,
                isOnline: false,
                lastSeen: "2024-01-15T10:30:00Z",
                role: "user",
                bio: "Software engineer and open source contributor"
            },
            {
                id: 4,
                name: "Sarah Williams",
                username: "sarahw",
                email: "sarah@example.com",
                avatar: "https://ui-avatars.com/api/?name=Sarah+Williams&background=f59e0b&color=fff",
                status: "Do not disturb",
                isVerified: true,
                isOnline: true,
                lastSeen: new Date().toISOString(),
                role: "admin",
                bio: "Community manager and content creator"
            }
        ];

        // Sample groups
        this.state.groups = [
            {
                id: 101,
                name: "Tech Enthusiasts",
                description: "Discussing latest in tech",
                avatar: "https://ui-avatars.com/api/?name=Tech+Enthusiasts&background=667eea&color=fff",
                members: [1, 2, 3, 4],
                admins: [1, 4],
                isPublic: true,
                createdAt: "2024-01-01",
                lastActivity: new Date().toISOString()
            },
            {
                id: 102,
                name: "Design Community",
                description: "Design discussions and critiques",
                avatar: "https://ui-avatars.com/api/?name=Design+Community&background=764ba2&color=fff",
                members: [2, 4],
                admins: [2],
                isPublic: true,
                createdAt: "2024-01-05",
                lastActivity: new Date().toISOString()
            }
        ];

        // Sample chats (both private and group)
        this.state.chats = [
            {
                id: 1,
                type: "private",
                participants: [1, 2],
                lastMessage: {
                    text: "Hey! How's the project going?",
                    senderId: 2,
                    timestamp: new Date().toISOString(),
                    isRead: true
                },
                unreadCount: 0,
                isPinned: true,
                isMuted: false
            },
            {
                id: 2,
                type: "group",
                groupId: 101,
                lastMessage: {
                    text: "Check out this new framework!",
                    senderId: 3,
                    timestamp: new Date().toISOString(),
                    isRead: false
                },
                unreadCount: 3,
                isPinned: false,
                isMuted: false
            },
            {
                id: 3,
                type: "private",
                participants: [1, 4],
                lastMessage: {
                    text: "Meeting at 3 PM tomorrow",
                    senderId: 4,
                    timestamp: "2024-01-14T15:30:00Z",
                    isRead: true
                },
                unreadCount: 0,
                isPinned: true,
                isMuted: true
            }
        ];

        // Sample messages
        this.state.messages = {
            1: [
                {
                    id: 1,
                    senderId: 1,
                    text: "Hello Jane! How are you?",
                    timestamp: "2024-01-15T10:00:00Z",
                    type: "text",
                    status: "read"
                },
                {
                    id: 2,
                    senderId: 2,
                    text: "Hi John! I'm good, working on the new project.",
                    timestamp: "2024-01-15T10:05:00Z",
                    type: "text",
                    status: "read"
                },
                {
                    id: 3,
                    senderId: 1,
                    text: "That's great! Can you share the design files?",
                    timestamp: "2024-01-15T10:10:00Z",
                    type: "text",
                    status: "read"
                },
                {
                    id: 4,
                    senderId: 2,
                    text: "Sure, here's the link: drive.google.com/files/design",
                    timestamp: "2024-01-15T10:15:00Z",
                    type: "text",
                    status: "read"
                },
                {
                    id: 5,
                    senderId: 1,
                    text: "Thanks! 😊",
                    timestamp: "2024-01-15T10:20:00Z",
                    type: "text",
                    status: "read"
                }
            ],
            2: [
                {
                    id: 1,
                    senderId: 3,
                    text: "Hey everyone, check out this new React framework!",
                    timestamp: "2024-01-15T09:00:00Z",
                    type: "text",
                    status: "read"
                },
                {
                    id: 2,
                    senderId: 4,
                    text: "Looks interesting! Have you tried it?",
                    timestamp: "2024-01-15T09:05:00Z",
                    type: "text",
                    status: "read"
                },
                {
                    id: 3,
                    senderId: 1,
                    text: "I'm currently using it in a project. Works great!",
                    timestamp: "2024-01-15T09:10:00Z",
                    type: "text",
                    status: "read"
                },
                {
                    id: 4,
                    senderId: 2,
                    type: "image",
                    content: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
                    timestamp: "2024-01-15T09:15:00Z",
                    caption: "Screenshot of the project",
                    status: "delivered"
                },
                {
                    id: 5,
                    senderId: 3,
                    type: "file",
                    content: "react-framework-guide.pdf",
                    fileSize: "2.4 MB",
                    timestamp: "2024-01-15T09:20:00Z",
                    status: "sent"
                }
            ]
        };

        // Set current user (for demo)
        this.state.user = this.state.users[0];
        this.state.currentChat = this.state.chats[0];
    }

    // Setup event listeners
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });

        // Auth buttons
        document.getElementById('login-btn').addEventListener('click', () => this.showModal('login-modal'));
        document.getElementById('register-btn').addEventListener('click', () => this.showModal('register-modal'));

        // Modal switches
        document.getElementById('switch-to-register').addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('login-modal');
            this.showModal('register-modal');
        });

        document.getElementById('switch-to-login').addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('register-modal');
            this.showModal('login-modal');
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });

        // Auth forms
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('register-form').addEventListener('submit', (e) => this.handleRegister(e));

        // Chat actions
        document.getElementById('new-chat-btn').addEventListener('click', () => this.startNewChat());
        document.getElementById('new-group-btn').addEventListener('click', () => this.showModal('new-group-modal'));
        document.getElementById('send-btn').addEventListener('click', () => this.sendMessage());
        
        // Message input
        const messageInput = document.getElementById('message-input');
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        messageInput.addEventListener('input', () => {
            this.sendTypingIndicator();
        });

        // Emoji picker
        document.getElementById('emoji-btn').addEventListener('click', () => this.toggleEmojiPicker());
        
        // Attachment menu
        document.getElementById('attachment-btn').addEventListener('click', () => this.toggleAttachmentMenu());
        
        // Sticker picker
        document.getElementById('sticker-btn').addEventListener('click', () => this.toggleStickerPicker());

        // Camera
        document.getElementById('camera-btn').addEventListener('click', () => this.openCamera());

        // Voice recording
        const voiceBtn = document.getElementById('voice-btn');
        let isRecording = false;
        let mediaRecorder;
        let audioChunks = [];

        voiceBtn.addEventListener('mousedown', () => this.startVoiceRecording());
        voiceBtn.addEventListener('mouseup', () => this.stopVoiceRecording());
        voiceBtn.addEventListener('mouseleave', () => {
            if (isRecording) this.stopVoiceRecording();
        });

        // Toggle password visibility
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                const icon = this.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    input.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            });
        });

        // Avatar upload
        document.getElementById('upload-avatar-btn').addEventListener('click', () => {
            document.getElementById('register-avatar').click();
        });

        document.getElementById('register-avatar').addEventListener('change', (e) => {
            this.handleAvatarUpload(e);
        });

        // Profile update
        document.getElementById('profile-form')?.addEventListener('submit', (e) => this.updateProfile(e));

        // Group creation
        document.getElementById('new-group-form')?.addEventListener('submit', (e) => this.createGroup(e));

        // Chat list clicks
        document.addEventListener('click', (e) => {
            const chatItem = e.target.closest('.chat-item');
            if (chatItem) {
                const chatId = parseInt(chatItem.dataset.chatId);
                this.selectChat(chatId);
            }
        });

        // Close pickers when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.emoji-picker') && !e.target.closest('.emoji-btn')) {
                this.hideEmojiPicker();
            }
            
            if (!e.target.closest('.attachment-menu') && !e.target.closest('.attachment-btn')) {
                this.hideAttachmentMenu();
            }
            
            if (!e.target.closest('.sticker-picker') && !e.target.closest('.sticker-btn')) {
                this.hideStickerPicker();
            }
        });
