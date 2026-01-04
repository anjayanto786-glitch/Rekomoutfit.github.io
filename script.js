// Inisialisasi AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // ========== TAMBAHKAN DI SINI ==========
    // Muat state yang disimpan saat halaman dimuat
    loadAppState();
     document.addEventListener('keydown', handleKeyboardNavigation);
    // =======================================
});
function handleKeyboardNavigation(event) {
    // Hanya handle tombol Enter (key code 13)
    if (event.keyCode === 13 || event.key === 'Enter') {
        event.preventDefault();
        
        // Dapatkan halaman aktif saat ini
        const activePage = document.querySelector('.page.active');
        if (!activePage) return;
        
        const pageId = activePage.id;
        
        switch(pageId) {
            case 'dashboard':
                handleDashboardEnter();
                break;
            case 'quiz':
                handleQuizEnter();
                break;
            case 'result':
                handleResultEnter();
                break;
            case 'recommendation':
                handleRecommendationEnter(event);
                break;
        }
    }
}

function handleDashboardEnter() {
    const startQuizBtn = document.getElementById('startQuiz');
    if (startQuizBtn) {
        startQuizBtn.click();
    }
}

function handleQuizEnter() {
    const nextBtn = document.getElementById('nextBtn');
    const selectedOption = document.querySelector('.option.selected');
    
    // Jika ada opsi yang dipilih dan tombol next tidak disabled, lanjut ke pertanyaan berikutnya
    if (selectedOption && nextBtn && !nextBtn.disabled) {
        nextBtn.click();
    }
}

function handleResultEnter() {
    const recommendationBtn = document.getElementById('recommendationBtn');
    if (recommendationBtn) {
        recommendationBtn.click();
    }
}

function handleRecommendationEnter(event) {
    // Cek jika yang focused adalah recommendation item
    const focusedElement = document.activeElement;
    const recommendationItem = focusedElement.closest('.recommendation-item');
    
    if (recommendationItem) {
        recommendationItem.click();
    }
    
    // Cek jika modal sedang terbuka
    const modal = document.getElementById('outfitModal');
    if (modal && modal.style.display === 'block') {
        handleModalEnter(event);
    }
}

function handleModalEnter(event) {
    const modal = document.getElementById('outfitModal');
    const closeBtn = document.querySelector('.close-modal');
    const imageItems = document.querySelectorAll('.image-item');
    
    // Tutup modal dengan Enter
    if (closeBtn && document.activeElement === closeBtn) {
        closeBtn.click();
        return;
    }
    
    // Jika focus ada pada gambar, buka gambar tersebut
    const focusedImage = document.activeElement.closest('.image-item');
    if (focusedImage) {
        const img = focusedImage.querySelector('img');
        if (img) {
            img.click();
        }
    }
}

// Variabel state aplikasi
let currentQuestion = 0;
let answers = {};
let userBodyShape = "";
// ========== TAMBAHKAN DI SINI ==========
let currentPage = "dashboard"; // Tambahkan variabel untuk melacak halaman saat ini
// =======================================

// Elemen DOM
const dashboardPage = document.getElementById('dashboard');
const quizPage = document.getElementById('quiz');
const resultPage = document.getElementById('result');
const recommendationPage = document.getElementById('recommendation');

const startQuizBtn = document.getElementById('startQuiz');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const questionContainer = document.getElementById('questionContainer');
const quizProgress = document.getElementById('quizProgress');
const resultContent = document.getElementById('resultContent');
const recommendationBtn = document.getElementById('recommendationBtn');
const restartBtn = document.getElementById('restartBtn');
const bodyShapeName = document.getElementById('bodyShapeName');
const recommendationContent = document.getElementById('recommendationContent');
const backToResultBtn = document.getElementById('backToResult');
const newQuizBtn = document.getElementById('newQuiz');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');
const progressPercent = document.getElementById('progressPercent');

// Data contoh outfit untuk setiap rekomendasi
// Data contoh outfit untuk setiap rekomendasi - LENGKAP 5 BENTUK TUBUH
const outfitExamples = {
    // 1. JAM PASIR (sudah ada)
    jam_pasir: {
        suitable: [
            {
                title: "Gaun Terusan Bersiluet Panjang",
                description: "Gaun yang mengikuti lekuk tubuh dengan potongan menonjolkan pinggang ramping.",
                images: [
                    "images/outfits/jam_pasir/suitable/gaun_panjang_1.jpg",
                    "images/outfits/jam_pasir/suitable/gaun_panjang_2.jpg",
                    "images/outfits/jam_pasir/suitable/gaun_panjang_3.jpg",
                    "images/outfits/jam_pasir/suitable/gaun_panjang_4.jpg"
                ]
            },
            {
                title: "Busana Sederhana dan Minimalis",
                description: "Desain clean tanpa detail berlebihan yang fokus pada bentuk alami tubuh.",
                images: [
                    "images/outfits/jam_pasir/suitable/minimalis_1.jpeg",
                    "images/outfits/jam_pasir/suitable/minimalis_2.jpeg",
                    "images/outfits/jam_pasir/suitable/minimalis_3.jpg",
                    "images/outfits/jam_pasir/suitable/minimalis_4.jpg"
                ]
            },
            {
                title: "Busana Bergaris Vertikal",
                description: "Corak garis vertikal membantu menonjolkan tinggi badan dan lekuk tubuh.",
                images: [
                    "images/outfits/jam_pasir/suitable/garis_vertikal_1.jpg",
                    "images/outfits/jam_pasir/suitable/garis_vertikal_2.jpg",
                    "images/outfits/jam_pasir/suitable/garis_vertikal_3.jpg",
                    "images/outfits/jam_pasir/suitable/garis_vertikal_4.jpg"
                ]
            },
            
        ],
        avoid: [
            {
                title: "Pakaian Berlapis-lapis",
                description: "Hindari terlalu banyak layer yang dapat menyembunyikan lekuk tubuh alami.",
                images: [
                    "images/outfits/jam_pasir/avoid/berlapis_1.jpg",
                    "images/outfits/jam_pasir/avoid/berlapis_2.jpg",
                    "images/outfits/jam_pasir/avoid/berlapis_3.jpg",
                    "images/outfits/jam_pasir/avoid/berlapis_4.jpg"
                ]
            },
            {
                title: "Busana Bersiluet H",
                description: "Siluet lurus atau sedikit longgar dapat menyembunyikan pinggang ramping.",
                images: [
                    "images/outfits/jam_pasir/avoid/siluet_h_1.jpg",
                    "images/outfits/jam_pasir/avoid/siluet_h_2.jpg",
                    "images/outfits/jam_pasir/avoid/siluet_h_3.jpg",
                    "images/outfits/jam_pasir/avoid/siluet_h_4.jpg"
                ]
            },
            {
                title: "Pakaian yang longgar atau oversize",
                description: "Hindari pakaian yang tidak memberikan definisi pada area pinggang.",
                images: [
                    "images/outfits/jam_pasir/avoid/longgar_1.jpg",
                    "images/outfits/jam_pasir/avoid/longgar_2.jpg",
                    "images/outfits/jam_pasir/avoid/longgar_3.jpg",
                    "images/outfits/jam_pasir/avoid/longgar_4.jpg"
                ]
            },
           
        ]
    },

    // 2. PERSEGI (RECTANGLE)
    persegi: {
        suitable: [
            {
                title: "Busana Bersiluet Ramping",
                description: "Potongan princess yang membantu menciptakan ilusi lekuk tubuh.",
                images: [
                    "images/outfits/persegi/suitable/ramping_1.jpeg",
                    "images/outfits/persegi/suitable/ramping_2.jpeg",
                    "images/outfits/persegi/suitable/ramping_3.jpeg",
                    "images/outfits/persegi/suitable/ramping_4.jpeg"
                ]
            },
            {
                title: "Ikat Pinggang Tipis/Sedang",
                description: "Membantu mendefinisikan waistline dan menciptakan lekuk.",
                images: [
                    "images/outfits/persegi/suitable/ikat_pinggang_1.jpeg",
                    "images/outfits/persegi/suitable/ikat_pinggang_2.jpeg",
                    "images/outfits/persegi/suitable/ikat_pinggang_3.jpeg",
                    "images/outfits/persegi/suitable/ikat_pinggang_4.jpeg"
                ]
            },
            {
                title: "Model Sederhana Warna Gelap",
                description: "Warna gelap dengan desain minimalis menciptakan siluet yang ramping.",
                images: [
                    "images/outfits/persegi/suitable/warna_gelap_1.jpeg",
                    "images/outfits/persegi/suitable/warna_gelap_2.jpeg",
                    "images/outfits/persegi/suitable/warna_gelap_3.jpeg",
                    "images/outfits/persegi/suitable/warna_gelap_4.jpeg"
                ]
            },
            {
                title: "Corak Garis Diagonal",
                description: "Garis diagonal membantu menciptakan dimensi dan lekuk tubuh.",
                images: [
                    "images/outfits/persegi/suitable/garis_diagonal_1.jpeg",
                    "images/outfits/persegi/suitable/garis_diagonal_2.jpeg",
                    "images/outfits/persegi/suitable/garis_diagonal_3.jpeg",
                    "images/outfits/persegi/suitable/garis_diagonal_4.jpeg"
                ]
            },
            
        ],
        avoid: [
            {
                title: "Busana Bersiluet Lurus dan Longgar",
                description: "Dapat membuat tubuh terlihat lebih persegi dan tanpa bentuk.",
                images: [
                    "images/outfits/persegi/avoid/siluet_lurus_1.jpeg",
                    "images/outfits/persegi/avoid/siluet_lurus_2.jpeg",
                    "images/outfits/persegi/avoid/siluet_lurus_3.jpeg",
                    "images/outfits/persegi/avoid/siluet_lurus_4.jpeg"
                ]
            },
            {
                title: "Atasan Model Kaku dan Lurus",
                description: "Tidak memberikan definisi pada bentuk tubuh.",
                images: [
                    "images/outfits/persegi/avoid/atasan_kaku_1.jpeg",
                    "images/outfits/persegi/avoid/atasan_kaku_2.jpeg",
                    "images/outfits/persegi/avoid/atasan_kaku_3.jpeg",
                    "images/outfits/persegi/avoid/atasan_kaku_4.jpeg"
                ]
            },
            
            
        ]
    },

    // 3. SEGITIGA TERBALIK (INVERTED TRIANGLE)
    segitiga_terbalik: {
        suitable: [
            {
                title: "Atasan yang Fit di Badan",
                description: "Tidak terlalu ketat atau longgar, pas di badan untuk balance proporsi.",
                images: [
                    "images/outfits/segitiga_terbalik/suitable/atasan_fit_1.jpeg",
                    "images/outfits/segitiga_terbalik/suitable/atasan_fit_2.jpeg",
                    "images/outfits/segitiga_terbalik/suitable/atasan_fit_3.jpeg",
                    "images/outfits/segitiga_terbalik/suitable/atasan_fit_4.jpeg"
                ]
            },
            {
                title: "Kombinasi Warna Gelap-Terang",
                description: "Atasan gelap dengan bawahan bercorak untuk menyeimbangkan proporsi.",
                images: [
                    "images/outfits/segitiga_terbalik/suitable/kombinasi_warna_1.jpeg",
                    "images/outfits/segitiga_terbalik/suitable/kombinasi_warna_2.jpeg",
                    "images/outfits/segitiga_terbalik/suitable/kombinasi_warna_3.jpeg",
                    "images/outfits/segitiga_terbalik/suitable/kombinasi_warna_4.jpeg"
                ]
            },
            {
                title: "Gaun dengan Kerah Terbuka",
                description: "Model kerah terbuka dengan bahan lembut untuk mengurangi fokus pada bahu.",
                images: [
                    "images/outfits/segitiga_terbalik/suitable/kerah_terbuka_1.jpeg",
                    "images/outfits/segitiga_terbalik/suitable/kerah_terbuka_2.jpeg",
                    "images/outfits/segitiga_terbalik/suitable/kerah_terbuka_3.jpeg",
                    "images/outfits/segitiga_terbalik/suitable/kerah_terbuka_4.jpeg"
                ]
            },
           
           
        ],
        avoid: [
            {
                title: "Detail Ramai pada Atasan",
                description: "Dapat membuat bahu terlihat lebih lebar.",
                images: [
                    "images/outfits/segitiga_terbalik/avoid/detail_ramai_1.jpeg",
                    "images/outfits/segitiga_terbalik/avoid/detail_ramai_2.jpeg",
                    "images/outfits/segitiga_terbalik/avoid/detail_ramai_3.jpeg",
                    "images/outfits/segitiga_terbalik/avoid/detail_ramai_4.jpeg"
                ]
            },
            {
                title: "Ikat Pinggang Lebar dan Ketat",
                description: "Dapat menciptakan ketidakseimbangan proporsi.",
                images: [
                    "images/outfits/segitiga_terbalik/avoid/ikat_lebar_1.jpeg",
                    "images/outfits/segitiga_terbalik/avoid/ikat_lebar_2.jpeg",
                    "images/outfits/segitiga_terbalik/avoid/ikat_lebar_3.jpeg",
                    "images/outfits/segitiga_terbalik/avoid/ikat_lebar_4.jpeg"
                ]
            },
            {
                title: "Atasan Bahan Tebal dan Berlapis",
                description: "Menambah volume tidak perlu di area bahu.",
                images: [
                    "images/outfits/segitiga_terbalik/avoid/atasan_tebal_1.jpeg",
                    "images/outfits/segitiga_terbalik/avoid/atasan_tebal_2.jpeg",
                    "images/outfits/segitiga_terbalik/avoid/atasan_tebal_3.jpeg",
                    "images/outfits/segitiga_terbalik/avoid/atasan_tebal_4.jpeg"
                ]
            }
        ]
    },

    // 4. PIR/SEGITIGA (TRIANGLE/PEAR)
    pir: {
        suitable: [
            {
                title: "Busana dengan Garis Bahu Diperlebar",
                description: "Lengan model jas yang tegas untuk menyeimbangkan pinggul lebar.",
                images: [
                    "images/outfits/pir/suitable/bahu_diperlebar_1.jpeg",
                    "images/outfits/pir/suitable/bahu_diperlebar_2.jpeg",
                    "images/outfits/pir/suitable/bahu_diperlebar_3.jpeg",
                    "images/outfits/pir/suitable/bahu_diperlebar_4.jpeg"
                ]
            },
            {
                title: "Busana Bercorak Besar atau Mencolok",
                description: "Corak besar di bagian atas untuk menarik perhatian ke area bahu.",
                images: [
                    "images/outfits/pir/suitable/corak_besar_1.jpeg",
                    "images/outfits/pir/suitable/corak_besar_2.jpeg",
                    "images/outfits/pir/suitable/corak_besar_3.jpeg",
                    "images/outfits/pir/suitable/corak_besar_4.jpeg"
                ]
            },
            {
                title: "Rok yang Bergaris Ramping",
                description: "Rok dengan potongan yang streamline di bagian bawah.",
                images: [
                    "images/outfits/pir/suitable/rok_ramping_1.jpeg",
                    "images/outfits/pir/suitable/rok_ramping_2.jpeg",
                    "images/outfits/pir/suitable/rok_ramping_3.jpeg",
                    "images/outfits/pir/suitable/rok_ramping_4.jpeg"
                ]
            }
          
        ],
        avoid: [
            {
                title: "Atasan dengan Lengan Langsung",
                description: "Seperti raglan, dapat membuat bahu terlihat lebih sempit.",
                images: [
                    "images/outfits/pir/avoid/lengan_langsung_1.jpeg",
                    "images/outfits/pir/avoid/lengan_langsung_2.jpeg",
                    "images/outfits/pir/avoid/lengan_langsung_3.jpeg",
                    "images/outfits/pir/avoid/lengan_langsung_4.jpeg"
                ]
            },
            {
                title: "Blus Potongan Leher Tinggi dan Ketat",
                description: "Dapat membuat proporsi atas-bawah tidak seimbang.",
                images: [
                    "images/outfits/pir/avoid/leher_tinggi_1.jpeg",
                    "images/outfits/pir/avoid/leher_tinggi_2.jpeg",
                    "images/outfits/pir/avoid/leher_tinggi_3.jpeg",
                    "images/outfits/pir/avoid/leher_tinggi_4.jpeg"
                ]
            },
            {
                title: "Rok yang Melebar di Bagian Bawah",
                description: "Dapat menambah volume tidak perlu di area pinggul.",
                images: [
                    "images/outfits/pir/avoid/rok_melebar_1.jpeg",
                    "images/outfits/pir/avoid/rok_melebar_2.jpeg",
                    "images/outfits/pir/avoid/rok_melebar_3.jpeg",
                    "images/outfits/pir/avoid/rok_melebar_4.jpeg"
                ]
            },
        ]
    },

    // 5. APEL (APPLE)
    apel: {
        suitable: [
            {
                title: "Busana Berbahan Lembut",
                description: "Bahan yang jatuh dengan natural dan nyaman di tubuh.",
                images: [
                    "images/outfits/apel/suitable/bahan_lembut_(1).jpeg",
                    "images/outfits/apel/suitable/bahan_lembut_(2).jpeg",
                    "images/outfits/apel/suitable/bahan_lembut_(3).jpeg",
                    "images/outfits/apel/suitable/bahan_lembut_(4).jpeg"
                ]
            },
            {
                title: "Atasan Panjang di Bawah Panggul",
                description: "Membantu menutupi area perut dengan nyaman.",
                images: [
                    "images/outfits/apel/suitable/atasan_panjang_(1).jpeg",
                    "images/outfits/apel/suitable/atasan_panjang_(2).jpeg",
                    "images/outfits/apel/suitable/atasan_panjang_(3).jpeg",
                    "images/outfits/apel/suitable/atasan_panjang_(4).jpeg"
                ]
            },
            {
                title: "Celana atau Rok Lurus",
                description: "Potongan lurus yang tidak menambah volume di area tertentu.",
                images: [
                    "images/outfits/apel/suitable/rok_lurus_(1).jpeg",
                    "images/outfits/apel/suitable/rok_lurus_(2).jpeg",
                    "images/outfits/apel/suitable/rok_lurus_(3).jpeg",
                    "images/outfits/apel/suitable/rok_lurus_(4).jpeg"
                ]
            },
        ],
        avoid: [
            {
                title: "Busana yang Ketat atau Terlalu Longgar",
                description: "Dapat menonjolkan area perut atau membuat terlihat lebih besar.",
                images: [
                    "images/outfits/apel/avoid/ketat_longgar_1.jpeg",
                    "images/outfits/apel/avoid/ketat_longgar_2.jpeg",
                    "images/outfits/apel/avoid/ketat_longgar_3.jpeg",
                    "images/outfits/apel/avoid/ketat_longgar_4.jpeg"
                ]
            },
            {
                title: "Busana yang Berlapis-lapis",
                description: "Dapat menambah volume tidak perlu di area tengah tubuh.",
                images: [
                    "images/outfits/apel/avoid/berlapis_apel_1.jpeg",
                    "images/outfits/apel/avoid/berlapis_apel_2.jpeg",
                    "images/outfits/apel/avoid/berlapis_apel_3.jpeg",
                    "images/outfits/apel/avoid/berlapis_apel_4.jpeg"
                ]
            },
            {
                title: "Busana dengan Detail Ramai",
                description: "Seperti kerut dan lipit, dapat menambah fokus di area perut.",
                images: [
                    "images/outfits/apel/avoid/detail_ramai_apel_1.jpeg",
                    "images/outfits/apel/avoid/detail_ramai_apel_2.jpeg",
                    "images/outfits/apel/avoid/detail_ramai_apel_3.jpeg",
                    "images/outfits/apel/avoid/detail_ramai_apel_4.jpeg"
                ]
            },
        ]
    }
};

// ========== TAMBAHKAN FUNGSI PERSISTENCE DI SINI ==========
// Fungsi untuk menyimpan state aplikasi ke localStorage
function saveAppState() {
    const appState = {
        currentQuestion: currentQuestion,
        answers: answers,
        userBodyShape: userBodyShape,
        currentPage: currentPage
    };
    localStorage.setItem('fashionAdvisorState', JSON.stringify(appState));
}

// Fungsi untuk memuat state aplikasi dari localStorage
function loadAppState() {
    const savedState = localStorage.getItem('fashionAdvisorState');
    if (savedState) {
        const appState = JSON.parse(savedState);
        currentQuestion = appState.currentQuestion || 0;
        answers = appState.answers || {};
        userBodyShape = appState.userBodyShape || "";
        currentPage = appState.currentPage || "dashboard";
        
        // Tampilkan halaman terakhir yang dikunjungi
        showLastPage();
    }
}

// Fungsi untuk menampilkan halaman terakhir
function showLastPage() {
    switch(currentPage) {
        case "quiz":
            showPage(quizPage);
            loadQuestion();
            updateProgress();
            break;
        case "result":
            showPage(resultPage);
            // Perlu render ulang hasil
            if (userBodyShape) {
                const bodyShape = bodyShapes[userBodyShape];
                resultContent.innerHTML = `
                    <div class="result-card" data-aos="zoom-in">
                        <h2 class="result-title">🎉 Hasil Identifikasi</h2>
                        <div class="result-shape">Bentuk Tubuh Anda:</div>
                        <h1 class="body-shape-result">${bodyShape.name}</h1>
                        <p class="result-description">${bodyShape.description}</p>
                    </div>
                `;
            }
            break;
        case "recommendation":
            showPage(recommendationPage);
            // Perlu render ulang rekomendasi
            if (userBodyShape) {
                showRecommendation();
            }
            break;
        default:
            showPage(dashboardPage);
            break;
    }
}
// =========================================================

// ==================== EVENT LISTENERS DENGAN DELEGATION ====================
document.addEventListener('click', function(event) {
    // Start Quiz
    if (event.target.id === 'startQuiz' || event.target.closest('#startQuiz')) {
        event.preventDefault();
        startQuiz();
    }
    
    // Previous Question
    if (event.target.id === 'prevBtn' || event.target.closest('#prevBtn')) {
        event.preventDefault();
        prevQuestion();
    }
    
    // Next Question
    if (event.target.id === 'nextBtn' || event.target.closest('#nextBtn')) {
        event.preventDefault();
        nextQuestion();
    }
    
    // Recommendation Button
    if (event.target.id === 'recommendationBtn' || event.target.closest('#recommendationBtn')) {
        event.preventDefault();
        console.log('Recommendation button clicked!');
        showRecommendation();
    }
    
    // Restart Quiz
    if (event.target.id === 'restartBtn' || event.target.closest('#restartBtn')) {
        event.preventDefault();
        restartQuiz();
    }
    
    // Back to Result
    if (event.target.id === 'backToResult' || event.target.closest('#backToResult')) {
        event.preventDefault();
        backToResult();
    }
    
    // New Quiz
    if (event.target.id === 'newQuiz' || event.target.closest('#newQuiz')) {
        event.preventDefault();
        newQuiz();
    }
});

// ==================== FUNGSI-FUNGSI UTAMA ====================

// Fungsi untuk memulai kuis (MODIFIED)
function startQuiz() {
    // ========== TAMBAHKAN DI SINI ==========
    // Reset state ketika mulai kuis baru
    currentQuestion = 0;
    answers = {};
    userBodyShape = "";
    saveAppState();
    // =======================================
    
    showPage(quizPage);
    updateProgressInfo();
    loadQuestion();
    updateProgress();
}

// Fungsi untuk menampilkan halaman tertentu (MODIFIED)
function showPage(page) {
    const pages = [dashboardPage, quizPage, resultPage, recommendationPage];
    pages.forEach(p => {
        if (p) p.classList.remove('active');
    });
    if (page) {
        page.classList.add('active');
        page.classList.add('fade-in');
    }
    
    // ========== TAMBAHKAN DI SINI ==========
    // Update currentPage berdasarkan halaman yang aktif
    if (page === dashboardPage) currentPage = "dashboard";
    else if (page === quizPage) currentPage = "quiz";
    else if (page === resultPage) currentPage = "result";
    else if (page === recommendationPage) currentPage = "recommendation";
    
    // Simpan state setiap kali berpindah halaman
    saveAppState();
    // =======================================
    
    // Re-inisialisasi AOS untuk halaman baru
    AOS.refresh();
}

// Fungsi untuk memperbarui info progress
function updateProgressInfo() {
    if (currentQuestionEl) currentQuestionEl.textContent = currentQuestion + 1;
    if (totalQuestionsEl) totalQuestionsEl.textContent = questions.length;
    const percent = Math.round(((currentQuestion + 1) / questions.length) * 100);
    if (progressPercent) progressPercent.textContent = percent + '%';
}

// Fungsi untuk memuat pertanyaan (MODIFIED)
function loadQuestion() {
    const question = questions[currentQuestion];
    questionContainer.innerHTML = `
        <div class="question" data-aos="fade-up">
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option ${answers[currentQuestion] === index ? 'selected' : ''}" 
                         data-index="${index}"
                         data-aos="zoom-in" 
                         data-aos-delay="${index * 100}">
                        ${option.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Tambahkan event listener untuk opsi
    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach(option => {
        option.addEventListener('click', () => {
            // Hapus seleksi dari semua opsi
            optionElements.forEach(opt => opt.classList.remove('selected'));
            // Tandai opsi yang dipilih
            option.classList.add('selected');
            // Tambah animasi bounce
            option.classList.add('bounce');
            setTimeout(() => option.classList.remove('bounce'), 600);
            
            // Simpan jawaban
            answers[currentQuestion] = parseInt(option.dataset.index);
            
            // ========== TAMBAHKAN DI SINI ==========
            // Simpan state
            saveAppState();
            // =======================================
            
            // Aktifkan tombol Selanjutnya
            nextBtn.disabled = false;
        });
    });

    // Update status tombol
    updateProgressInfo();
    
    // Sembunyikan tombol Sebelumnya di pertanyaan pertama
    if (currentQuestion === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-flex';
    }
    
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = answers[currentQuestion] === undefined;
    nextBtn.textContent = currentQuestion === questions.length - 1 ? 'Lihat Hasil →' : 'Selanjutnya →';
}

// Fungsi untuk pertanyaan sebelumnya (MODIFIED)
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        updateProgress();
        // ========== TAMBAHKAN DI SINI ==========
        saveAppState();
        // =======================================
    }
}

// Fungsi untuk pertanyaan selanjutnya (MODIFIED)
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
        updateProgress();
        // ========== TAMBAHKAN DI SINI ==========
        saveAppState();
        // =======================================
    } else {
        calculateResult();
    }
}

// Fungsi untuk memperbarui progress bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    quizProgress.style.width = progress + '%';
}

// Fungsi untuk menghitung hasil (MODIFIED)
function calculateResult() {
    // Hitung frekuensi setiap bentuk tubuh dalam jawaban
    const frequency = {};
    
    Object.values(answers).forEach(answerIndex => {
        const question = questions[currentQuestion];
        const bodyShapeValue = question.options[answerIndex].value;
        
        if (frequency[bodyShapeValue]) {
            frequency[bodyShapeValue]++;
        } else {
            frequency[bodyShapeValue] = 1;
        }
    });
    
    // Temukan bentuk tubuh dengan frekuensi tertinggi
    let maxFreq = 0;
    let mostFrequentBodyShape = "";
    
    for (const [bodyShape, freq] of Object.entries(frequency)) {
        if (freq > maxFreq) {
            maxFreq = freq;
            mostFrequentBodyShape = bodyShape;
        }
    }
    
    userBodyShape = mostFrequentBodyShape;
    // ========== TAMBAHKAN DI SINI ==========
    saveAppState(); // Simpan state setelah dapat hasil
    // =======================================
    showResult();
}

// Fungsi untuk menampilkan hasil
function showResult() {
    const bodyShape = bodyShapes[userBodyShape];
    
    resultContent.innerHTML = `
        <div class="result-card" data-aos="zoom-in">
            <h2 class="result-title">🎉 Hasil Identifikasi</h2>
            <div class="result-shape">Bentuk Tubuh Anda:</div>
            <h1 class="body-shape-result">${bodyShape.name}</h1>
            <p class="result-description">${bodyShape.description}</p>
        </div>
    `;
    
    showPage(resultPage);
}

// Fungsi untuk menampilkan rekomendasi
function showRecommendation() {
    const bodyShape = bodyShapes[userBodyShape];
    
    recommendationContent.innerHTML = `
        <div class="recommendation-header" data-aos="fade-down">
            <h2>Rekomendasi Outfit untuk <span style="color: var(--primary);">${bodyShape.name}</span></h2>
            <p>Klik pada setiap item untuk melihat 4 contoh outfit</p>
        </div>
        
        <div class="recommendation-cards">
            <div class="recommendation-card positive" data-aos="fade-right">
                <h4>✅ <span>Pakaian yang Cocok</span></h4>
                <ul class="recommendation-list">
                    ${bodyShape.suitable.map((item, index) => `
                        <li class="recommendation-item" data-type="suitable" data-index="${index}">
                            <span class="item-text">${item}</span>
                            <span class="click-hint">👆 Klik untuk lihat 4 contoh</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="recommendation-card negative" data-aos="fade-left">
                <h4>❌ <span>Pakaian yang Harus Dihindari</span></h4>
                <ul class="recommendation-list">
                    ${bodyShape.avoid.map((item, index) => `
                        <li class="recommendation-item" data-type="avoid" data-index="${index}">
                            <span class="item-text">${item}</span>
                            <span class="click-hint">👆 Klik untuk lihat 4 contoh</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
        
        <!-- Modal untuk menampilkan 4 foto -->
        <div id="outfitModal" class="modal">
            <div class="modal-content large-modal">
                <span class="close-modal">&times;</span>
                <div class="modal-header">
                    <h3 id="modalTitle"></h3>
                    <p id="modalDescription"></p>
                </div>
                <div class="modal-body">
                    <div class="image-grid" id="imageGrid">
                        <!-- 4 gambar akan dimuat di sini -->
                    </div>
                </div>
            </div>
        </div>
        
        <div class="tips-section" data-aos="fade-up">
            <h3>💡 Tips Tambahan</h3>
            <p>
                Ingatlah bahwa fashion adalah tentang merasa percaya diri! Gunakan rekomendasi ini sebagai panduan, 
                tetapi jangan ragu untuk bereksperimen dengan gaya yang membuat Anda merasa nyaman dan bahagia.
            </p>
        </div>
    `;
    
    // Tambahkan event listener untuk item rekomendasi
    addRecommendationEventListeners();
    
    showPage(recommendationPage);
}

// Fungsi untuk menambahkan event listener pada item rekomendasi
function addRecommendationEventListeners() {
    // Event delegation untuk recommendation items
    recommendationContent.addEventListener('click', function(event) {
        const item = event.target.closest('.recommendation-item');
        if (item) {
            const type = item.dataset.type;
            const index = parseInt(item.dataset.index);
            console.log('Item clicked:', type, index);
            showOutfitExample(type, index);
        }
    });
    
    // Event listener untuk menutup modal
    const modal = document.getElementById('outfitModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Tutup modal ketika klik di luar konten
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Fungsi untuk menampilkan contoh outfit (MODIFIED dengan error handling)
function showOutfitExample(type, index) {
    const modal = document.getElementById('outfitModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const imageGrid = document.getElementById('imageGrid');
    
    // Dapatkan contoh outfit berdasarkan bentuk tubuh dan tipe
    const example = getOutfitExample(userBodyShape, type, index);
    
    modalTitle.textContent = example.title;
    modalDescription.textContent = example.description;
    
    // Load 4 gambar ke dalam grid dengan error handling
    imageGrid.innerHTML = example.images.map((image, imgIndex) => `
        <div class="image-item" data-aos="zoom-in" data-aos-delay="${imgIndex * 100}">
            <img src="${image}" alt="${example.title} ${imgIndex + 1}" 
                 onerror="this.src='https://via.placeholder.com/300x400/cccccc/666666?text=Gambar+Tidak+Tersedia'"
                 onclick="openImageModal('${image}', '${example.title} ${imgIndex + 1}')">
            <div class="image-overlay">
                <span class="zoom-icon">🔍</span>
            </div>
        </div>
    `).join('');
    
    modal.style.display = 'block';
}

// Fungsi untuk membuka gambar individual dalam modal besar
function openImageModal(imageSrc, imageAlt) {
    // Tutup modal utama dulu
    document.getElementById('outfitModal').style.display = 'none';
    
    // Buat modal untuk gambar individual
    const imageModal = document.createElement('div');
    imageModal.className = 'modal image-modal';
    imageModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeImageModal()">&times;</span>
            <div class="modal-body">
                <img src="${imageSrc}" alt="${imageAlt}" class="full-size-image">
            </div>
        </div>
    `;
    
    document.body.appendChild(imageModal);
    imageModal.style.display = 'block';
    
    // Event listener untuk tutup modal gambar
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
}

// Fungsi untuk menutup modal gambar individual
function closeImageModal() {
    const imageModal = document.querySelector('.image-modal');
    if (imageModal) {
        imageModal.remove();
    }
    // Tampilkan kembali modal utama
    document.getElementById('outfitModal').style.display = 'block';
}

// Fungsi untuk mendapatkan contoh outfit (MODIFIED)
function getOutfitExample(bodyShape, type, index) {
    // Cek apakah ada data spesifik untuk bentuk tubuh ini
    if (outfitExamples[bodyShape] && outfitExamples[bodyShape][type] && outfitExamples[bodyShape][type][index]) {
        return outfitExamples[bodyShape][type][index];
    }
    
    // Fallback ke placeholder jika data tidak ada
    const baseUrl = "https://via.placeholder.com/300x400";
    const colors = {
        suitable: "6c63ff/ffffff",
        avoid: "ff6b6b/ffffff"
    };
    
    const bodyShapeNames = {
        jam_pasir: "Jam Pasir",
        persegi: "Persegi",
        segitiga_terbalik: "Segitiga Terbalik",
        pir: "Pir",
        apel: "Apel"
    };
    
    const itemType = type === 'suitable' ? 'Cocok' : 'Hindari';
    
    return {
        title: `Contoh Outfit ${itemType}`,
        description: `Ini adalah contoh outfit yang ${type === 'suitable' ? 'cocok' : 'harus dihindari'} untuk bentuk tubuh ${bodyShapeNames[bodyShape]}.`,
        images: [
            `${baseUrl}/${colors[type]}?text=Contoh+1`,
            `${baseUrl}/${colors[type]}?text=Contoh+2`,
            `${baseUrl}/${colors[type]}?text=Contoh+3`,
            `${baseUrl}/${colors[type]}?text=Contoh+4`
        ]
    };
}

// Fungsi untuk memulai ulang kuis (MODIFIED)
function restartQuiz() {
    // ========== TAMBAHKAN DI SINI ==========
    // Clear saved state ketika kembali ke beranda
    localStorage.removeItem('fashionAdvisorState');
    currentQuestion = 0;
    answers = {};
    userBodyShape = "";
    currentPage = "dashboard";
    // =======================================
    showPage(dashboardPage);
}

// Fungsi untuk kembali ke hasil
function backToResult() {
    showPage(resultPage);
}

// Fungsi untuk kuis baru (MODIFIED)
function newQuiz() {
    // ========== TAMBAHKAN DI SINI ==========
    // Clear saved state ketika mulai kuis baru
    localStorage.removeItem('fashionAdvisorState');
    currentQuestion = 0;
    answers = {};
    userBodyShape = "";
    currentPage = "dashboard";
    // =======================================
    showPage(dashboardPage);
}

// ========== TAMBAHKAN DI SINI ==========
// Event listener untuk sebelum unload (opsional, untuk backup)
window.addEventListener('beforeunload', function() {
    saveAppState();
});
// =======================================