// Import API functions
import { authAPI, profileAPI, careerAPI } from './api.js';

// Auth state
let isLoggedIn = false;
let currentUser = null;

// Check if user is authenticated
function isAuthenticated() {
    return isLoggedIn && currentUser !== null;
}

// Sample data for career paths, mentors, and courses
const careerPaths = {
    programming: {
        title: "Software Development Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Learn Programming Basics", "HTML, CSS, JavaScript", "Version Control (Git)"]
            },
            {
                title: "Intermediate",
                items: ["Web Development", "Database Management", "API Development"]
            },
            {
                title: "Advanced",
                items: ["Full Stack Development", "Cloud Services", "System Architecture"]
            }
        ]
    },
    data: {
        title: "Data Science Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Statistics & Mathematics", "Python Programming", "Data Analysis Basics"]
            },
            {
                title: "Intermediate",
                items: ["Machine Learning", "Data Visualization", "Big Data Technologies"]
            },
            {
                title: "Advanced",
                items: ["Deep Learning", "AI Development", "Data Engineering"]
            }
        ]
    },
    design: {
        title: "UX/UI Design Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Design Principles", "Color Theory", "Typography"]
            },
            {
                title: "Intermediate",
                items: ["UI Design", "Prototyping", "User Research"]
            },
            {
                title: "Advanced",
                items: ["UX Strategy", "Design Systems", "Interaction Design"]
            }
        ]
    },
    business: {
        title: "Business Management Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Business Fundamentals", "Economics", "Marketing Basics"]
            },
            {
                title: "Intermediate",
                items: ["Business Strategy", "Financial Management", "Operations"]
            },
            {
                title: "Advanced",
                items: ["Executive Leadership", "Strategic Planning", "Business Development"]
            }
        ]
    },
    science: {
        title: "Scientific Research Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Scientific Method", "Laboratory Skills", "Research Writing"]
            },
            {
                title: "Intermediate",
                items: ["Specialized Research", "Data Analysis", "Publication"]
            },
            {
                title: "Advanced",
                items: ["Research Leadership", "Grant Writing", "Scientific Innovation"]
            }
        ]
    },
    engineering: {
        title: "Engineering Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Engineering Principles", "Technical Drawing", "Mathematics"]
            },
            {
                title: "Intermediate",
                items: ["Specialized Engineering", "Project Management", "Technical Design"]
            },
            {
                title: "Advanced",
                items: ["Engineering Leadership", "Innovation", "Research & Development"]
            }
        ]
    },
    creative_arts: {
        title: "Creative Arts Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Art Fundamentals", "Creative Techniques", "Portfolio Building"]
            },
            {
                title: "Intermediate",
                items: ["Specialized Art Forms", "Digital Tools", "Creative Projects"]
            },
            {
                title: "Advanced",
                items: ["Art Direction", "Creative Leadership", "Artistic Innovation"]
            }
        ]
    },
    social_sciences: {
        title: "Social Sciences Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Social Theory", "Research Methods", "Data Analysis"]
            },
            {
                title: "Intermediate",
                items: ["Specialized Research", "Policy Analysis", "Social Impact"]
            },
            {
                title: "Advanced",
                items: ["Research Leadership", "Policy Development", "Social Innovation"]
            }
        ]
    },
    humanities: {
        title: "Humanities Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Critical Thinking", "Research Writing", "Cultural Studies"]
            },
            {
                title: "Intermediate",
                items: ["Specialized Studies", "Academic Writing", "Cultural Analysis"]
            },
            {
                title: "Advanced",
                items: ["Academic Leadership", "Research Direction", "Cultural Innovation"]
            }
        ]
    },
    health_medicine: {
        title: "Healthcare Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Medical Basics", "Patient Care", "Healthcare Ethics"]
            },
            {
                title: "Intermediate",
                items: ["Specialized Care", "Medical Research", "Healthcare Management"]
            },
            {
                title: "Advanced",
                items: ["Medical Leadership", "Healthcare Innovation", "Medical Education"]
            }
        ]
    },
    education: {
        title: "Education Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Teaching Methods", "Curriculum Design", "Student Assessment"]
            },
            {
                title: "Intermediate",
                items: ["Educational Technology", "Special Education", "Educational Leadership"]
            },
            {
                title: "Advanced",
                items: ["Educational Administration", "Policy Development", "Educational Innovation"]
            }
        ]
    },
    law: {
        title: "Legal Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Legal Principles", "Case Analysis", "Legal Writing"]
            },
            {
                title: "Intermediate",
                items: ["Specialized Law", "Legal Research", "Client Representation"]
            },
            {
                title: "Advanced",
                items: ["Legal Leadership", "Policy Development", "Legal Innovation"]
            }
        ]
    },
    finance: {
        title: "Finance Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Financial Analysis", "Accounting", "Investment Basics"]
            },
            {
                title: "Intermediate",
                items: ["Financial Planning", "Risk Management", "Investment Strategy"]
            },
            {
                title: "Advanced",
                items: ["Financial Leadership", "Portfolio Management", "Financial Innovation"]
            }
        ]
    },
    marketing: {
        title: "Marketing Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Marketing Basics", "Digital Marketing", "Brand Management"]
            },
            {
                title: "Intermediate",
                items: ["Marketing Strategy", "Market Research", "Campaign Management"]
            },
            {
                title: "Advanced",
                items: ["Marketing Leadership", "Brand Strategy", "Marketing Innovation"]
            }
        ]
    },
    psychology: {
        title: "Psychology Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Psychology Basics", "Research Methods", "Counseling Skills"]
            },
            {
                title: "Intermediate",
                items: ["Specialized Practice", "Clinical Work", "Psychological Assessment"]
            },
            {
                title: "Advanced",
                items: ["Clinical Leadership", "Research Direction", "Psychological Innovation"]
            }
        ]
    },
    sociology: {
        title: "Sociology Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Social Theory", "Research Methods", "Social Analysis"]
            },
            {
                title: "Intermediate",
                items: ["Social Research", "Policy Analysis", "Social Impact"]
            },
            {
                title: "Advanced",
                items: ["Research Leadership", "Policy Development", "Social Innovation"]
            }
        ]
    },
    political_science: {
        title: "Political Science Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Political Theory", "Research Methods", "Policy Analysis"]
            },
            {
                title: "Intermediate",
                items: ["Political Research", "Policy Development", "Political Strategy"]
            },
            {
                title: "Advanced",
                items: ["Political Leadership", "Policy Direction", "Political Innovation"]
            }
        ]
    },
    philosophy: {
        title: "Philosophy Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Philosophical Theory", "Critical Thinking", "Ethical Analysis"]
            },
            {
                title: "Intermediate",
                items: ["Specialized Studies", "Academic Writing", "Philosophical Research"]
            },
            {
                title: "Advanced",
                items: ["Academic Leadership", "Research Direction", "Philosophical Innovation"]
            }
        ]
    },
    linguistics: {
        title: "Linguistics Career Path",
        steps: [
            {
                title: "Foundation",
                items: ["Language Theory", "Research Methods", "Language Analysis"]
            },
            {
                title: "Intermediate",
                items: ["Specialized Studies", "Language Research", "Applied Linguistics"]
            },
            {
                title: "Advanced",
                items: ["Research Leadership", "Language Innovation", "Academic Direction"]
            }
        ]
    }
};

const mentors = [
    {
        id: 1,
        name: "Sarah Johnson",
        expertise: "Software Development",
        experience: "10 years",
        bio: "Senior Software Engineer at Google, specializing in full-stack development.",
        image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
        id: 2,
        name: "Michael Chen",
        expertise: "Data Science",
        experience: "8 years",
        bio: "Lead Data Scientist at Amazon, expert in machine learning and AI.",
        image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
        id: 3,
        name: "Emily Davis",
        expertise: "UX/UI Design",
        experience: "7 years",
        bio: "Senior UX Designer at Adobe, focused on user-centered design.",
        image: "https://randomuser.me/api/portraits/women/3.jpg"
    }
];

const courses = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        provider: "Udemy",
        duration: "40 hours",
        level: "Beginner to Advanced",
        price: "$99.99"
    },
    {
        id: 2,
        title: "Data Science and Machine Learning",
        provider: "Coursera",
        duration: "12 weeks",
        level: "Intermediate",
        price: "$49/month"
    },
    {
        id: 3,
        title: "UX/UI Design Masterclass",
        provider: "Skillshare",
        duration: "15 hours",
        level: "All Levels",
        price: "$19/month"
    }
];

// Career interests data
const careerInterests = {
    technology: [
        "Web Development",
        "Mobile App Development",
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Cybersecurity",
        "Cloud Computing",
        "DevOps",
        "Blockchain",
        "Game Development"
    ],
    science: [
        "Physics",
        "Chemistry",
        "Biology",
        "Astronomy",
        "Environmental Science",
        "Neuroscience",
        "Genetics",
        "Marine Biology",
        "Geology",
        "Meteorology"
    ],
    business: [
        "Entrepreneurship",
        "Marketing",
        "Finance",
        "Human Resources",
        "Project Management",
        "Business Analytics",
        "International Business",
        "Supply Chain Management",
        "Consulting",
        "E-commerce"
    ],
    arts: [
        "Graphic Design",
        "UI/UX Design",
        "Animation",
        "Photography",
        "Film Making",
        "Music Production",
        "Fashion Design",
        "Interior Design",
        "Architecture",
        "Digital Art"
    ],
    healthcare: [
        "Medicine",
        "Nursing",
        "Pharmacy",
        "Dentistry",
        "Physical Therapy",
        "Mental Health",
        "Public Health",
        "Nutrition",
        "Medical Research",
        "Healthcare Administration"
    ],
    education: [
        "Teaching",
        "Educational Technology",
        "Curriculum Development",
        "Special Education",
        "Educational Psychology",
        "School Administration",
        "Language Education",
        "Early Childhood Education",
        "Higher Education",
        "Educational Research"
    ],
    engineering: [
        "Mechanical Engineering",
        "Electrical Engineering",
        "Civil Engineering",
        "Chemical Engineering",
        "Aerospace Engineering",
        "Biomedical Engineering",
        "Environmental Engineering",
        "Computer Engineering",
        "Industrial Engineering",
        "Materials Engineering"
    ],
    sports: [
        "Athletics",
        "Sports Management",
        "Sports Medicine",
        "Sports Psychology",
        "Coaching",
        "Physical Education",
        "Sports Marketing",
        "Sports Analytics",
        "Sports Nutrition",
        "Sports Technology"
    ],
    social: [
        "Psychology",
        "Sociology",
        "Anthropology",
        "Political Science",
        "Economics",
        "International Relations",
        "Social Work",
        "Public Policy",
        "Criminology",
        "Communication Studies"
    ]
};

// DOM Elements
const careerForm = document.getElementById('careerForm');
const careerPathContainer = document.getElementById('careerPath');
const flowchart = document.getElementById('flowchart');
const mentorsGrid = document.getElementById('mentorsGrid');
const coursesGrid = document.getElementById('coursesGrid');
const authModal = document.getElementById('authModal');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authSwitch = document.getElementById('authSwitch');
const authSubmit = document.getElementById('authSubmit');
const signupFields = document.getElementById('signupFields');
const profileForm = document.getElementById('profileForm');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    setupFormHandlers();
    initializeAuthModal();
    checkAuthState();

    // Add event listeners for auth action buttons
    document.addEventListener('click', (e) => {
        const authAction = e.target.dataset.authAction;
        const scrollTo = e.target.dataset.scrollTo;
        const action = e.target.dataset.action;

        if (authAction) {
            switch (authAction) {
                case 'login':
                case 'signup':
                    openAuthModal(authAction);
                    break;
                case 'close':
                    closeAuthModal();
                    break;
                case 'toggle':
                    e.preventDefault();
                    toggleAuthMode();
                    break;
            }
        }

        if (scrollTo) {
            scrollToSection(scrollTo);
        }

        if (action === 'add-education') {
            addEducationEntry();
        }
        
        if (action === 'remove-education') {
            removeEducationEntry(e.target);
        }
    });

    // Redundant safety: directly bind login/signup button clicks
    try {
        document.querySelectorAll('[data-auth-action="login"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openAuthModal('login');
            });
        });
        document.querySelectorAll('[data-auth-action="signup"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openAuthModal('signup');
            });
        });
    } catch (bindErr) {
        console.error('Error binding auth buttons:', bindErr);
    }

    // Make auth functions available globally (also assigned at top-level below)
    window.openAuthModal = openAuthModal;
    window.closeAuthModal = closeAuthModal;
    window.toggleAuthMode = toggleAuthMode;
    window.handleLogout = handleLogout;
    window.removeEducationEntry = removeEducationEntry;
    
    // Check if we're on the profile page
    if (profileForm && isAuthenticated()) {
        console.log('On profile page and authenticated, loading profile data');
        loadUserProfile();
    }
});

// Ensure functions are globally accessible even before DOMContentLoaded fires
try {
    window.openAuthModal = openAuthModal;
    window.closeAuthModal = closeAuthModal;
    window.toggleAuthMode = toggleAuthMode;
    window.handleLogout = handleLogout;
    window.removeEducationEntry = removeEducationEntry;
} catch (exposeErr) {
    console.warn('Global exposure of auth functions failed (may be before definitions):', exposeErr);
}

// Check authentication state
async function checkAuthState() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const userData = await authAPI.getCurrentUser();
            isLoggedIn = true;
            currentUser = userData.data;
            updateAuthUI();
            loadUserProfile();
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('token');
            isLoggedIn = false;
            currentUser = null;
            updateAuthUI();
        }
    } else {
        updateAuthUI();
    }
}

// Update UI based on auth state
function updateAuthUI() {
    const authButtons = document.querySelector('.auth-buttons');
    if (isLoggedIn) {
        authButtons.innerHTML = `
            <span class="user-name">Welcome, ${currentUser.name}</span>
            <button class="auth-button logout-button" onclick="handleLogout()">Logout</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button class="auth-button login-button" onclick="openAuthModal('login')">Login</button>
            <button class="auth-button signup-button" onclick="openAuthModal('signup')">Sign Up</button>
        `;
    }
}

// Handle logout
async function handleLogout() {
    try {
        await authAPI.logout();
        isLoggedIn = false;
        currentUser = null;
        updateAuthUI();
        closeAuthModal();
    } catch (error) {
        console.error('Logout failed:', error);
    }
}

// Setup form handlers
function setupFormHandlers() {
    console.log('Setting up form handlers');
    
    // Career form handler
    const careerForm = document.getElementById('careerForm');
    if (careerForm) {
        console.log('Career form found, setting up submit handler');
        careerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Career form submitted');

            // Check if user is authenticated
            if (!isAuthenticated()) {
                console.log('User not authenticated, showing auth modal');
                openAuthModal('login');
                return;
            }

            const selectedInterests = getSelectedInterests();
            console.log('Selected interests:', selectedInterests);

            if (selectedInterests.length === 0) {
                showError('Please select at least one interest');
                return;
            }

            const qualification = document.getElementById('qualification').value;
            const field = document.getElementById('field').value;

            console.log('Form values - Qualification:', qualification, 'Field:', field);

            try {
                // Show loading state
                const submitButton = careerForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Generating Career Path...';
                submitButton.disabled = true;
                
                console.log('Sending career suggestion request:', {
                    interests: selectedInterests,
                    qualification,
                    field
                });

                const response = await careerAPI.getSuggestions({
                    interests: selectedInterests,
                    qualification,
                    field
                });

                console.log('Career suggestions response:', response);

                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Display the career path
                if (response && response.data) {
                    displayCareerPath(response.data);
                } else {
                    console.error('Invalid response format:', response);
                    showError('Invalid response format received from server');
                }
            } catch (error) {
                console.error('Error getting career suggestions:', error);
                showError('An error occurred while getting career suggestions. Please try again.');
                
                // Reset button state
                const submitButton = careerForm.querySelector('button[type="submit"]');
                submitButton.textContent = 'Generate Career Path';
                submitButton.disabled = false;
            } 
            // catch (error) {
            //     console.error(' Error getting career suggestions:', error);
            //     showError('An error occurred while getting career suggestions. Please try again.');
            // }
        });
    } else {
        console.error('Career form not found in the DOM');
    }

    // Auth form handler
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Auth form submitted');
        
        const isLogin = document.getElementById('authTitle').textContent === 'Login';
        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        if (!isLogin) {
            formData.name = document.getElementById('name').value;
            if (formData.password !== document.getElementById('confirmPassword').value) {
                showError('Passwords do not match!');
                return;
            }
        }

        try {
            if (isLogin) {
                const response = await authAPI.login(formData);
                localStorage.setItem('token', response.token);
                isLoggedIn = true;
                currentUser = response.user;
                updateAuthUI();
                closeAuthModal();
                loadUserProfile();
            } else {
                const response = await authAPI.register(formData);
                localStorage.setItem('token', response.token);
                isLoggedIn = true;
                currentUser = response.user;
                updateAuthUI();
                closeAuthModal();
                loadUserProfile();
            }
        } catch (error) {
            showError(error.message || 'Authentication failed');
        }
    });
}

// Generate career path based on user input
function generateCareerPath(qualification, field, interests) {
    careerPathContainer.classList.remove('hidden');
    
    // Clear previous flowchart
    flowchart.innerHTML = '';
    
    // Create flowchart based on selected interests
    interests.forEach(interest => {
        if (careerPaths[interest]) {
            const path = careerPaths[interest];
            createFlowchart(path);
        }
    });
}

// Create flowchart visualization
function createFlowchart(path) {
    const flowchartDiv = document.createElement('div');
    flowchartDiv.className = 'path-flowchart';
    
    path.steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'flowchart-step';
        
        const stepTitle = document.createElement('h4');
        stepTitle.textContent = step.title;
        stepDiv.appendChild(stepTitle);
        
        const itemsList = document.createElement('ul');
        step.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            itemsList.appendChild(listItem);
        });
        stepDiv.appendChild(itemsList);
        
        flowchartDiv.appendChild(stepDiv);
        
        // Add arrow between steps
        if (index < path.steps.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'flowchart-arrow';
            arrow.innerHTML = '↓';
            flowchartDiv.appendChild(arrow);
        }
    });
    
    flowchart.appendChild(flowchartDiv);
}

// Display mentors
function displayMentors() {
    mentors.forEach(mentor => {
        const mentorCard = document.createElement('div');
        mentorCard.className = 'mentor-card';
        mentorCard.innerHTML = `
            <img src="${mentor.image}" alt="${mentor.name}" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 1rem;">
            <h3>${mentor.name}</h3>
            <p><strong>Expertise:</strong> ${mentor.expertise}</p>
            <p><strong>Experience:</strong> ${mentor.experience}</p>
            <p>${mentor.bio}</p>
            <button onclick="contactMentor(${mentor.id})" class="submit-button" style="margin-top: 1rem;">Contact Mentor</button>
        `;
        mentorsGrid.appendChild(mentorCard);
    });
}

// Display courses
function displayCourses() {
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <p><strong>Provider:</strong> ${course.provider}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Level:</strong> ${course.level}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <button onclick="enrollCourse(${course.id})" class="submit-button" style="margin-top: 1rem;">Enroll Now</button>
        `;
        coursesGrid.appendChild(courseCard);
    });
}

// Contact mentor function
function contactMentor(mentorId) {
    const mentor = mentors.find(m => m.id === mentorId);
    alert(`Contact request sent to ${mentor.name}. They will reach out to you soon!`);
}

// Enroll in course function
function enrollCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    alert(`Successfully enrolled in ${course.title}! Check your email for further instructions.`);
}

// Auth Modal Functions
function openAuthModal(mode) {
    console.log('Opening auth modal in mode:', mode);
    const authModal = document.getElementById('authModal');
    const authTitle = document.getElementById('authTitle');
    const authSubmit = document.getElementById('authSubmit');
    const signupFields = document.getElementById('signupFields');
    const authSwitch = document.getElementById('authSwitch');
    const authForm = document.getElementById('authForm');
    
    if (!authModal || !authTitle || !authSubmit || !signupFields || !authSwitch || !authForm) {
        console.error('Auth modal elements not found');
        return;
    }
    
    authModal.style.display = 'flex';
    authTitle.textContent = mode === 'login' ? 'Login' : 'Sign Up';
    authSubmit.textContent = mode === 'login' ? 'Login' : 'Sign Up';
    signupFields.style.display = mode === 'login' ? 'none' : 'block';
    authSwitch.innerHTML = mode === 'login' 
        ? 'Don\'t have an account? <a href="#" onclick="toggleAuthMode()">Sign up</a>'
        : 'Already have an account? <a href="#" onclick="toggleAuthMode()">Login</a>';
    
    // Clear form
    authForm.reset();
}

function closeAuthModal() {
    console.log('Closing auth modal');
    const authModal = document.getElementById('authModal');
    const authForm = document.getElementById('authForm');
    
    if (!authModal || !authForm) {
        console.error('Auth modal elements not found');
        return;
    }
    
    authModal.style.display = 'none';
    authForm.reset();
}

function toggleAuthMode() {
    console.log('Toggling auth mode');
    const authTitle = document.getElementById('authTitle');
    if (!authTitle) {
        console.error('Auth title element not found');
        return;
    }
    
    const currentMode = authTitle.textContent.toLowerCase();
    openAuthModal(currentMode === 'login' ? 'signup' : 'login');
}

// Initialize auth modal event listeners
function initializeAuthModal() {
    console.log('Initializing auth modal');
    const authModal = document.getElementById('authModal');
    if (!authModal) {
        console.error('Auth modal element not found');
        return;
    }
    
    // Close modal when clicking outside
    authModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeAuthModal();
        }
    });
    
    // Setup auth form handler
    const authForm = document.getElementById('authForm');
    if (!authForm) {
        console.error('Auth form element not found');
        return;
    }
    
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Auth form submitted');
        
        const isLogin = document.getElementById('authTitle').textContent === 'Login';
        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        if (!isLogin) {
            formData.name = document.getElementById('name').value;
            if (formData.password !== document.getElementById('confirmPassword').value) {
                showError('Passwords do not match!');
                return;
            }
        }

        try {
            if (isLogin) {
                const response = await authAPI.login(formData);
                localStorage.setItem('token', response.token);
                isLoggedIn = true;
                currentUser = response.user;
                updateAuthUI();
                closeAuthModal();
                loadUserProfile();
            } else {
                const response = await authAPI.register(formData);
                localStorage.setItem('token', response.token);
                isLoggedIn = true;
                currentUser = response.user;
                updateAuthUI();
                closeAuthModal();
                loadUserProfile();
            }
        } catch (error) {
            showError(error.message || 'Authentication failed');
        }
    });
}

// Smooth Scroll
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Profile Functions
function addEducationEntry() {
    const container = document.getElementById('educationContainer');
    const template = container.querySelector('.education-entry').cloneNode(true);
    template.querySelectorAll('input, select').forEach(input => input.value = '');
    template.querySelector('.remove-button').setAttribute('data-action', 'remove-education');
    container.appendChild(template);
}

function removeEducationEntry(button) {
    const entry = button.parentElement;
    entry.remove();
}

function updateInterests() {
    const careerField = document.getElementById('careerField').value;
    const container = document.getElementById('interestsContainer');
    container.innerHTML = ''; // Clear existing interests

    // Add interests based on career field
    const interests = getInterestsByField(careerField);
    interests.forEach(interest => {
        const label = document.createElement('label');
        label.className = 'interest-item';
        label.innerHTML = `
            <input type="checkbox" value="${interest}"> ${interest}
        `;
        container.appendChild(label);
    });
}

function getInterestsByField(field) {
    const interestsMap = {
        technology: ['Web Development', 'Mobile Development', 'Data Science', 'AI/ML', 'Cybersecurity'],
        science: ['Research', 'Laboratory Work', 'Data Analysis', 'Scientific Writing', 'Field Work'],
        business: ['Management', 'Marketing', 'Finance', 'Entrepreneurship', 'Consulting'],
        // Add more fields and their interests
    };
    return interestsMap[field] || [];
}

// Profile Form Submission (guard for pages without profile form)
if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Check if user is authenticated
        if (!isAuthenticated()) {
            console.log('User not authenticated, showing auth modal');
            openAuthModal('login');
            return;
        }
        
        const profileData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('profileEmail').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            education: getEducationData(),
            careerField: document.getElementById('careerField').value,
            interests: getSelectedInterests()
        };

        try {
            console.log('Saving profile data:', profileData);
            const response = await profileAPI.updateProfile(profileData);
            console.log('Profile saved successfully:', response);
            showSuccess('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            showError(error.message || 'Failed to update profile');
        }
    });
}

// Helper Functions
function getEducationData() {
    const educationEntries = document.querySelectorAll('.education-entry');
    return Array.from(educationEntries).map(entry => ({
        degree: entry.querySelector('#degree').value,
        field: entry.querySelector('#field').value,
        institution: entry.querySelector('#institution').value,
        year: entry.querySelector('#year').value
    }));
}

function getSelectedInterests() {
    const interests = document.querySelectorAll('.interests-container input[type="checkbox"]:checked');
    return Array.from(interests).map(interest => interest.value);
}

// Function to display career path
function displayCareerPath(careerData) {
    console.log('Displaying career path with data:', careerData);
    
    const careerPathSection = document.getElementById('careerPath');
    const coursesGrid = document.getElementById('coursesGrid');
    const mentorsGrid = document.getElementById('mentorsGrid');

    // Check if careerData and required properties exist
    if (!careerData || !careerData.careerPath) {
        console.error('Invalid career data received:', careerData);
        showError('Invalid career path data received');
        return;
    }

    // Make sure the career path section is visible
    careerPathSection.classList.remove('hidden');
    careerPathSection.style.display = 'block';
    
    // Extract data from the response
    const { title, description, recommendedRoles, requiredSkills } = careerData.careerPath;
    const recommendedCourses = careerData.recommendedCourses || [];
    const recommendedMentors = careerData.recommendedMentors || [];

    console.log('Career path data:', {
        title,
        description,
        recommendedRoles,
        requiredSkills,
        recommendedCourses,
        recommendedMentors
    });

    // Display career path
    careerPathSection.innerHTML = `
        <h2>${title || 'Career Path'}</h2>
        <p>${description || 'No description available'}</p>
        <div class="roles">
            <h3>Recommended Roles</h3>
            <ul>
                ${(recommendedRoles || []).map(role => `
                    <li>${role}</li>
                `).join('')}
            </ul>
        </div>
        <div class="skills">
            <h3>Required Skills</h3>
            <ul>
                ${(requiredSkills || []).map(skill => `
                    <li>${skill}</li>
                `).join('')}
            </ul>
        </div>
    `;

    // Display recommended courses in the courses section
    if (coursesGrid) {
        coursesGrid.innerHTML = recommendedCourses.map(course => `
            <div class="course">
                <h4>${course.title || 'Course Title'}</h4>
                <p><strong>Provider:</strong> ${course.provider || 'N/A'}</p>
                <p><strong>Level:</strong> ${course.level || 'N/A'}</p>
                <p><strong>Duration:</strong> ${course.duration || 'N/A'}</p>
                ${course.link ? `
                    <div class="course-actions">
                        <a href="${course.link}" target="_blank" class="course-link">
                            <i class="fas fa-external-link-alt"></i>
                            Enroll Now
                        </a>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    // Display recommended mentors
    if (mentorsGrid) {
        mentorsGrid.innerHTML = recommendedMentors.map(mentor => `
            <div class="mentor">
                <div class="mentor-header">
                    <h4>${mentor.name || 'Mentor Name'}</h4>
                    <p class="mentor-title">${mentor.title || 'Mentor Title'}</p>
                </div>
                <p><strong>Expertise:</strong> ${mentor.expertise || 'N/A'}</p>
                <p><strong>Experience:</strong> ${mentor.experience || 'N/A'}</p>
                <p><strong>Specialization:</strong> ${mentor.specialization || 'N/A'}</p>
                <button class="connect-btn">Connect with Mentor</button>
            </div>
        `).join('');
    }
    
    // Scroll to the career path section
    careerPathSection.scrollIntoView({ behavior: 'smooth' });
}

// Function to show error messages

// Show error message
function showError(message) {
    console.error('Error:', message);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Remove any existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Add the new error message at the top of the page
    document.body.insertBefore(errorDiv, document.body.firstChild);
    
    // Remove the error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccess(message) {
    console.log('Success:', message);
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    // Remove any existing success messages
    const existingSuccess = document.querySelectorAll('.success-message');
    existingSuccess.forEach(success => success.remove());
    
    // Add the new success message at the top of the page
    document.body.insertBefore(successDiv, document.body.firstChild);
    
    // Remove the success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Load user profile on page load if logged in
async function loadUserProfile() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const user = await authAPI.getCurrentUser();
            const profile = await profileAPI.getProfile();
            
            // Update profile form with user data
            const profileForm = document.getElementById('profileForm');
            if (profileForm) {
                document.getElementById('fullName').value = profile.data.name || '';
                document.getElementById('profileEmail').value = profile.data.email || '';
                document.getElementById('dateOfBirth').value = profile.data.dateOfBirth ? new Date(profile.data.dateOfBirth).toISOString().split('T')[0] : '';
                document.getElementById('phone').value = profile.data.phone || '';
                document.getElementById('address').value = profile.data.address || '';
                document.getElementById('careerField').value = profile.data.careerField || '';
                
                // Update education entries
                if (profile.data.education && profile.data.education.length > 0) {
                    const container = document.getElementById('educationContainer');
                    container.innerHTML = ''; // Clear existing entries
                    profile.data.education.forEach(edu => {
                        const template = document.createElement('div');
                        template.className = 'education-entry';
                        template.innerHTML = `
                            <div class="form-group">
                                <label for="degree">Degree</label>
                                <select id="degree" required>
                                    <option value="${edu.degree}" selected>${edu.degree}</option>
                                    <option value="high_school">High School</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="bachelors">Bachelor's Degree</option>
                                    <option value="masters">Master's Degree</option>
                                    <option value="phd">PhD</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="field">Field of Study</label>
                                <input type="text" id="field" value="${edu.field}" required>
                            </div>
                            <div class="form-group">
                                <label for="institution">Institution</label>
                                <input type="text" id="institution" value="${edu.institution}" required>
                            </div>
                            <div class="form-group">
                                <label for="year">Year of Completion</label>
                                <input type="number" id="year" value="${edu.year}" required>
                            </div>
                            <button type="button" class="remove-button" data-action="remove-education">Remove</button>
                        `;
                        container.appendChild(template);
                    });
                }
                
                // Update interests
                updateInterests();
                if (profile.data.interests) {
                    profile.data.interests.forEach(interest => {
                        const checkbox = document.querySelector(`input[value="${interest}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                }
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            localStorage.removeItem('token');
        }
    }
} 