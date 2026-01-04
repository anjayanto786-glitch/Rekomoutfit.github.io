// Data pertanyaan untuk kuis
const questions = [
    {
        question: "Bagaimana proporsi bahu dan pinggang Anda?",
        options: [
            { text: "Bahu lebih lebar dari pinggang", value: "jam_pasir" },
            { text: "Bahu hampir sama lebarnya dengan pinggang", value: "persegi" },
            { text: "Bahu lebih ramping dari pinggang", value: "pir" },
            { text: "Bahu lebih lebar dari pinggang", value: "segitiga_terbalik" },
            { text: "Bahu tidak terlalu lebar dari pinggang", value: "apel" }
        ]
    },
    {
        question: "Bagaimana proporsi pinggang dan pinggul Anda?",
        options: [
            { text: "Pinggang tidak jelas, pinggul sama lebar dengan bahu", value: "persegi" },
            { text: "Pinggang ramping, pinggul lebih lebar", value: "pir" },
            { text: "Pinggang tidak jelas, pinggul lebih sempit", value: "segitiga_terbalik" },
            { text: "Pinggang ramping, pinggul sama lebar dengan bahu", value: "jam_pasir" },
            { text: "Pinggang tidak jelas, pinggul lebih sempit daripada perut", value: "apel" }
        ]
    },
    {
        question: "Bagaimana proporsi bahu dan pinggul Anda?",
        options: [
            { text: "Bahu dan pinggul sama lebar", value: "persegi" },
            { text: "Bahu sempit, pinggul lebar", value: "pir" },
            { text: "Bahu lebar, pinggul sempit", value: "segitiga_terbalik" },
            { text: "Bahu dan pinggul sama lebar", value: "jam_pasir" },
            { text: "Bahu lebarnya mirip dengan pinggul", value: "apel" }
        ]
    },
    {
        question: "Dimana area tubuh Anda yang paling banyak menyimpan lemak?",
        options: [
            { text: "Lemak tersebar merata di seluruh tubuh", value: "persegi" },
            { text: "Terutama di bagian bahu, lengan, dan dada", value: "segitiga_terbalik" },
            { text: "Terutama di bagian pinggul, paha, dan pantat", value: "pir" },
            { text: "Di bagian pinggang yang ramping, bahu dan pinggul berisi", value: "jam_pasir" },
            { text: "Terutama di sekitar perut dan pinggang", value: "apel" }
        ]
    },
    
];

// Data bentuk tubuh dan rekomendasinya
const bodyShapes = {
    jam_pasir: {
        name: "Jam Pasir",
        description: "Bentuk tubuh ini digambarkan seperti pertemuan dari dua ujung segitiga di tengahnya. Tipe tubuh ini ditentukan jika hasil pengukuran menunjukkan bahwa lebar bahu dan pinggul lebih besar dibandingkan lebar perut sehingga menimbulkan silhouette seperti jam pasir (hourglass).",
        suitable: [
            "Gaun terusan bersiluet panjang",
            "Mengenakan busana yang sederhana dan minimalis",
            "Jika berbusana yang memiliki corak garis maka sebaiknya memilih garis yang vertical, dan corak yang berukuran kecil",
            
        ],
        avoid: [
            "Pakaian yang berlapis-lapis",
            "Busana bersiluet H yang lurus ataupun sedikit longgar",
            "Pakaian yang longgar atau oversize",
            
        ]
    },
    persegi: {
        name: "Persegi",
        description: "Tipe tubuh persegi bisa dikenali dari ukuran yang menunjukkan kesamaan atau sedikit perbedaan antara lebar bahu, dada, perut, dan pinggul. Jadi jika seseorang dengan tipe tubuh ini berdiri, badannya terlihat lurus antara sisi kanan dan kirinya oleh karena itu tipe bentuk tubuh seperti ini dinamakan tipe persegi.",
        suitable: [
            "Busana bersiluet ramping dengan menerapkan potongan model princess",
            "Menggunakan ikat pinggang tipis atau sedang",
            "Model sederhana dan berwarna gelap",
            "Memilih corak garis yang diagonal",
           
        ],
        avoid: [
            "Busana yang bersiluet lurus dan longgar",
            "Atasan model kaku dan lurus",
           
        ]
    },
    segitiga_terbalik: {
        name: "Segitiga Terbalik",
        description: "Tipe bentuk segitiga terbalik dapat dilihat dari ukuran tubuh bagian atas terutama bahu dan dada yang lebih besar atau lebih bidang daripada ukuran tubuh bagian bawahnya sehingga membentuk seperti segitiga terbalik.",
        suitable: [
            "Atasan yang fit di badan, tidak terlalu ketat atau longgar",
            "Kombinasi atasan yang bernada gelap dengan bawahan yang bercorak atau memiliki detil tertentu misalnya sake, lipit, atau kerut",
            "Gaun dengan model kerah agak terbuka dan bahannya lembut",
           
        ],
        avoid: [
            "Busana yang memiliki detil ramai pada atasannya",
            "Memakai ikat pinggang yang lebar dan ketat",
            "Memakai atasan dengan bahan tebal, berlapis-lapis atau bercorak besar",
            
        ]
    },
    pir: {
        name: "Pir/Segitiga",
        description: "Tipe bentuk tubuh pir merupakan kebalikan dari segitiga terbalik yaitu tubuh bagian bawah seperti pinggul lebih besar dibandingkan ukuran tubuh bagian atasnya seperti dada dan bahu. Sebagian orang menyebut tipe ini bentuk tubuh segitiga.",
        suitable: [
            "Busana dengan garis bahu diperlebar, misalnya lengan model jas yang sedikit tegas",
            "Busana yang bercorak besar atau mencolok, atau dengan aksen ruffles dan kerutan",
            "Menggunakan rok yang bergaris ramping",
        ],
        avoid: [
            "Atasan yang berlengan langsung misalnya raglan, dan atasan dengan bahu terbuka",
            "Blus dengan potongan leher tinggi dan ketat",
            "Rok yang melebar di bagian bawah dan rok ketat",
        ]
    },
    apel: {
        name: "Apel",
        description: "Seperti yang dapat disimpulkan dari namanya, buah apel pada umumnya memiliki bentuk yang cenderung bulat, dimana hasil pengukuran menunjukkan bahwa lebar perut dan dada lebih besar dibandingkan dengan lebar bahu dan pinggul.",
        suitable: [
            "Busana yang berbahan lembut",
            "Atasan yang panjangnya di bawah panggul",
            "Celana atau rok lurus",
            
        ],
        avoid: [
            "Busana yang ketat atau terlalu longgar",
            "Busana yang berlapis-lapis",
            "Busana yang berdetil ramai seperti kerut, dan lipit",
            
        ]
    }
};