export const interviewQuestions = [
    // Technical Questions (10)
    {
        id: 1,
        type: 'technical',
        question: 'HTTP metodları hansılardır və fərqləri nədir?',
        keywords: ['get', 'post', 'put', 'delete', 'patch', 'məlumat almaq', 'göndərmək', 'yeniləmək', 'silmək', 'sorğu', 'cavab', 'status'],
        tips: 'GET, POST, PUT, DELETE, PATCH metodlarını və onların istifadə hallarını izah edin.'
    },
    {
        id: 2,
        type: 'technical',
        question: 'SQL-də JOIN növləri hansılardır?',
        keywords: ['inner', 'left', 'right', 'full', 'outer', 'birləşdirmək', 'cədvəl', 'cross', 'self', 'əlaqə'],
        tips: 'INNER JOIN, LEFT JOIN, RIGHT JOIN və FULL JOIN fərqlərini qeyd edin.'
    },
    {
        id: 3,
        type: 'technical',
        question: 'Agile və Waterfall modelləri arasındakı əsas fərq nədir?',
        keywords: ['çevik', 'mərhələli', 'sürətli', 'dəyişiklik', 'planlama', 'iterativ', 'sprint', 'scrum', 'ardıcıl', 'sənəd'],
        tips: 'Agile-in çevikliyini və Waterfall-un ardıcıllığını müqayisə edin.'
    },
    {
        id: 4,
        type: 'technical',
        question: 'API status kodları (200, 400, 500) nəyi bildirir?',
        keywords: ['uğurlu', 'xəta', 'server', 'client', 'tapılmadı', 'icazəsiz', 'ok', 'bad request', 'internal', 'not found'],
        tips: '2xx (Uğurlu), 4xx (Müştəri xətası), 5xx (Server xətası) qruplarını izah edin.'
    },
    {
        id: 5,
        type: 'technical',
        question: 'Cookie və LocalStorage fərqi nədir?',
        keywords: ['server', 'brauzer', 'ölçü', 'sessiya', 'saxlama', 'müddət', 'təhlükəsizlik', 'token', 'yaddaş', 'limit'],
        tips: 'Məlumatın harada saxlandığını, ölçü limitlərini və serverə göndərilib-göndərilmədiyini qeyd edin.'
    },
    {
        id: 6,
        type: 'technical',
        question: 'Smoke test və Sanity test fərqi nədir?',
        keywords: ['ilkin', 'dərin', 'build', 'funksionallıq', 'stabillik', 'regressiya', 'səthi', 'kritik', 'yoxlama', 'test'],
        tips: 'Smoke testin "build" stabilliyini, Sanity testin isə konkret düzəlişləri yoxladığını vurğulayın.'
    },
    {
        id: 7,
        type: 'technical',
        question: 'Test Case-in əsas komponentləri hansılardır?',
        keywords: ['id', 'başlıq', 'addımlar', 'gözlənilən', 'nəticə', 'precondition', 'postcondition', 'data', 'prioritet', 'status'],
        tips: 'Test Case ID, Description, Preconditions, Steps, Expected Result, Actual Result vacibdir.'
    },
    {
        id: 8,
        type: 'technical',
        question: 'Severity və Priority fərqi nədir?',
        keywords: ['təsir', 'təcililik', 'biznes', 'texniki', 'zaman', 'vaciblik', 'kritik', 'blok', 'ardıcıllıq', 'düzəliş'],
        tips: 'Severity problemin texniki təsirini, Priority isə nə qədər tez həll olunmalı olduğunu bildirir.'
    },
    {
        id: 9,
        type: 'technical',
        question: 'Selenium nədir və nə üçün istifadə olunur?',
        keywords: ['avtomatlaşdırma', 'web', 'brauzer', 'test', 'open source', 'driver', 'java', 'python', 'element', 'lokator'],
        tips: 'Selenium-un web tətbiqlərini avtomatlaşdırmaq üçün istifadə olunan open-source alət olduğunu deyin.'
    },
    {
        id: 10,
        type: 'technical',
        question: 'Git-də merge və rebase fərqi nədir?',
        keywords: ['tarixçə', 'birləşdirmə', 'xətti', 'commit', 'branch', 'dəyişiklik', 'konflikt', 'master', 'main', 'log'],
        tips: 'Merge-in tarixçəni saxladığını, Rebase-in isə tarixçəni xətti və təmiz etdiyini izah edin.'
    },

    // Situational Questions (5)
    {
        id: 11,
        type: 'situational',
        question: 'Developer baqı qəbul etmirsə ("It works on my machine"), nə edərsiniz?',
        keywords: ['sübut', 'screenshot', 'video', 'log', 'mühit', 'təkrarlamaq', 'birlikdə', 'brauzer', 'versiya', 'cache'],
        tips: 'Sübut təqdim etmək, mühit fərqlərini yoxlamaq və birlikdə baxmaq vacibdir.'
    },
    {
        id: 12,
        type: 'situational',
        question: 'Release günü kritik baq tapsanız nə edərsiniz?',
        keywords: ['xəbər vermək', 'dayandırmaq', 'risk', 'komanda', 'menecer', 'təxirə salmaq', 'blok', 'showstopper', 'email', 'chat'],
        tips: 'Dərhal komandaya və menecerə xəbər vermək, riski qiymətləndirmək və lazım gələrsə release-i dayandırmaq.'
    },
    {
        id: 13,
        type: 'situational',
        question: 'Test üçün vaxt çatmayanda nə edərsiniz?',
        keywords: ['prioritet', 'risk', 'əsas', 'funksionallıq', 'smoke', 'danışıq', 'kritik', 'happy path', 'əhatə', 'sürət'],
        tips: 'Prioritetləşdirmə aparmaq, riskli sahələri və əsas funksionallığı test etmək.'
    },
    {
        id: 14,
        type: 'situational',
        question: 'Sənədləşmə (tələblər) yoxdursa və ya natamamdırsa, necə test edərsiniz?',
        keywords: ['araşdırma', 'developer', 'sual', 'exploratory', 'oxşar', 'təcrübə', 'analiz', 'rəqib', 'standart', 'məntiq'],
        tips: 'Developerlə danışmaq, exploratory testing etmək və oxşar tətbiqlərə baxmaq.'
    },
    {
        id: 15,
        type: 'situational',
        question: 'Eyni anda bir neçə layihədə işləməli olsanız, vaxtı necə idarə edərsiniz?',
        keywords: ['planlama', 'prioritet', 'cədvəl', 'kommunikasiya', 'blok', 'deadline', 'təqvim', 'status', 'hesabat', 'multitasking'],
        tips: 'Tapşırıqları prioritetləşdirmək, vaxt bölgüsü etmək və komanda ilə açıq ünsiyyət.'
    },

    // Behavioral Questions (5)
    {
        id: 16,
        type: 'behavioral',
        question: 'Komanda yoldaşınızla fikir ayrılığı olanda necə həll edirsiniz?',
        keywords: ['dinləmək', 'hörmət', 'arqument', 'fakt', 'kompromis', 'hədəf', 'sakit', 'peşəkar', 'həll', 'müzakirə'],
        tips: 'Qarşı tərəfi dinləmək, faktlara əsaslanmaq və layihənin xeyrinə qərar vermək.'
    },
    {
        id: 17,
        type: 'behavioral',
        question: 'Ən böyük peşəkar uğursuzluğunuz nə olub və ondan nə öyrənmisiniz?',
        keywords: ['səhv', 'dərs', 'nəticə', 'inkişaf', 'məsuliyyət', 'düzəltmək', 'təcrübə', 'analiz', 'gələcək', 'düzəliş'],
        tips: 'Səmimi olmaq, səhvi qəbul etmək və ondan çıxarılan dərsi vurğulamaq.'
    },
    {
        id: 18,
        type: 'behavioral',
        question: 'Niyə QA sahəsini seçmisiniz?',
        keywords: ['maraq', 'keyfiyyət', 'analiz', 'detal', 'texnologiya', 'fayda', 'istifadəçi', 'məhsul', 'sabitlik', 'karyera'],
        tips: 'Texnologiyaya maraq, detallara diqqət və keyfiyyətli məhsul yaratmaq istəyi.'
    },
    {
        id: 19,
        type: 'behavioral',
        question: 'Stresli vəziyyətlərdə necə işləyirsiniz?',
        keywords: ['sakit', 'fokus', 'plan', 'nəfəs', 'həll', 'müsbət', 'prioritet', 'addım', 'soyuqqanlı', 'nəticə'],
        tips: 'Sakit qalmaq, problemə fokuslanmaq və addım-addım həll etmək.'
    },
    {
        id: 20,
        type: 'behavioral',
        question: 'Özünüzü inkişaf etdirmək üçün nə edirsiniz?',
        keywords: ['oxumaq', 'kurs', 'praktika', 'məqalə', 'konfrans', 'yeni', 'video', 'bloq', 'sertifikat', 'layihə'],
        tips: 'Kitab oxumaq, kurslar keçmək, yeni texnologiyaları araşdırmaq.'
    },
    // New Technical Questions
    {
        id: 21,
        type: 'technical',
        question: 'REST və SOAP arasındakı fərqlər nələrdir?',
        keywords: ['protokol', 'xml', 'json', 'yüngül', 'təhlükəsizlik', 'standart', 'sürət'],
        tips: 'REST-in daha yüngül və JSON istifadə etdiyini, SOAP-ın isə daha ağır və XML əsaslı olduğunu qeyd edin.'
    },
    {
        id: 22,
        type: 'technical',
        question: 'Primary Key və Foreign Key fərqi nədir?',
        keywords: ['unikal', 'əlaqə', 'təkrarlanmayan', 'null', 'cədvəl', 'istinad'],
        tips: 'Primary Key-in unikal olduğunu, Foreign Key-in isə başqa cədvələ istinad etdiyini izah edin.'
    },
    {
        id: 23,
        type: 'technical',
        question: 'Emulator, Simulator və Real Device testləri arasındakı fərq nədir?',
        keywords: ['aparat', 'proqram', 'dəqiqlik', 'sürət', 'real', 'mühit', 'sensor'],
        tips: 'Real cihazın ən dəqiq nəticə verdiyini, emulator/simulator-un isə ilkin testlər üçün sürətli olduğunu vurğulayın.'
    },
    {
        id: 24,
        type: 'technical',
        question: 'Baqın həyat dövrü (Bug Life Cycle) necədir?',
        keywords: ['new', 'assigned', 'open', 'fixed', 'retest', 'verified', 'closed', 'reopen'],
        tips: 'Baqın yaranmasından bağlanmasına qədər olan mərhələləri (New -> Assigned -> Fixed -> Verified -> Closed) sadalayın.'
    },
    {
        id: 25,
        type: 'technical',
        question: 'Regressiya testi nədir və nə vaxt edilir?',
        keywords: ['dəyişiklik', 'təkrar', 'mövcud', 'funksionallıq', 'yeni', 'kod', 'təsir'],
        tips: 'Kod dəyişikliyindən sonra mövcud funksionallığın pozulmadığını yoxlamaq üçün edildiyini deyin.'
    },

    // New Situational Questions
    {
        id: 26,
        type: 'situational',
        question: 'Developer "bu baq deyil, feature-dır" deyərsə, necə reaksiya verərsiniz?',
        keywords: ['tələb', 'sənəd', 'analitik', 'menecer', 'istifadəçi', 'təcrübə', 'məntiq'],
        tips: 'Tələblərə istinad etmək, istifadəçi təcrübəsini (UX) əsas gətirmək və lazım gələrsə BA/PO ilə dəqiqləşdirmək.'
    },
    {
        id: 27,
        type: 'situational',
        question: 'İstifadəçi istehsalatda (production) kritik baq tapıb, ilk addımınız nə olar?',
        keywords: ['təkrarlamaq', 'təcili', 'hotfix', 'analiz', 'səbəb', 'üzr', 'həll'],
        tips: 'Problemi təkrarlamağa çalışmaq, təsir dairəsini müəyyən etmək və dərhal hotfix prosesini başlatmaq.'
    },
    {
        id: 28,
        type: 'situational',
        question: 'Komandaya yeni QA qoşulub, ona necə kömək edərsiniz?',
        keywords: ['onboarding', 'sənədləşmə', 'layihə', 'mentor', 'dəstək', 'tanışlıq', 'proses'],
        tips: 'Layihə sənədlərini paylaşmaq, prosesləri izah etmək və suallarına açıq olmaq.'
    },

    // New Behavioral Questions
    {
        id: 29,
        type: 'behavioral',
        question: '5 il sonra özünüzü harada görürsünüz?',
        keywords: ['lider', 'senior', 'avtomatlaşdırma', 'menecer', 'ekspert', 'inkişaf', 'töhfə'],
        tips: 'Peşəkar inkişaf planlarınızı və şirkətə necə fayda verə biləcəyinizi qeyd edin.'
    },
    {
        id: 30,
        type: 'behavioral',
        question: 'Hansı iş mühitində daha məhsuldar olursunuz?',
        keywords: ['açıq', 'dəstək', 'kommunikasiya', 'sərbəst', 'komanda', 'sakit', 'dinamik'],
        tips: 'Sizi motivasiya edən mühiti təsvir edin, amma uyğunlaşa bildiyinizi də göstərin.'
    }
];
