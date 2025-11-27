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
    // New Technical Questions (10)
    {
        id: 21,
        type: 'technical',
        question: 'REST və SOAP arasındakı fərqlər nələrdir?',
        keywords: ['protokol', 'xml', 'json', 'yüngül', 'təhlükəsizlik', 'standart', 'sürət', 'memarlıq', 'status', 'ağır'],
        tips: 'REST-in daha yüngül və JSON istifadə etdiyini, SOAP-ın isə protokol olduğunu və XML əsaslı olduğunu qeyd edin.'
    },
    {
        id: 22,
        type: 'technical',
        question: 'Primary Key və Foreign Key fərqi nədir?',
        keywords: ['unikal', 'əlaqə', 'təkrarlanmayan', 'null', 'cədvəl', 'istinad', 'id', 'birləşmə', 'əsas', 'xarici'],
        tips: 'Primary Key-in unikal olduğunu, Foreign Key-in isə başqa cədvələ istinad etdiyini izah edin.'
    },
    {
        id: 23,
        type: 'technical',
        question: 'Emulator, Simulator və Real Device testləri arasındakı fərq nədir?',
        keywords: ['aparat', 'proqram', 'dəqiqlik', 'sürət', 'real', 'mühit', 'sensor', 'batareya', 'şəbəkə', 'davranış'],
        tips: 'Real cihazın ən dəqiq nəticə verdiyini, emulator/simulator-un isə ilkin testlər üçün sürətli olduğunu vurğulayın.'
    },
    {
        id: 24,
        type: 'technical',
        question: 'Baqın həyat dövrü (Bug Life Cycle) necədir?',
        keywords: ['new', 'assigned', 'open', 'fixed', 'retest', 'verified', 'closed', 'reopen', 'status', 'proses'],
        tips: 'Baqın yaranmasından bağlanmasına qədər olan mərhələləri (New -> Assigned -> Fixed -> Verified -> Closed) sadalayın.'
    },
    {
        id: 25,
        type: 'technical',
        question: 'Regressiya testi nədir və nə vaxt edilir?',
        keywords: ['dəyişiklik', 'təkrar', 'mövcud', 'funksionallıq', 'yeni', 'kod', 'təsir', 'sabitlik', 'release', 'bug fix'],
        tips: 'Kod dəyişikliyindən sonra mövcud funksionallığın pozulmadığını yoxlamaq üçün edildiyini deyin.'
    },
    {
        id: 26,
        type: 'technical',
        question: 'White Box və Black Box testi arasındakı fərq nədir?',
        keywords: ['kod', 'daxili', 'struktur', 'xarici', 'funksional', 'məntiq', 'developer', 'tester', 'giriş', 'çıxış'],
        tips: 'White Box-un kodun daxili strukturunu, Black Box-un isə yalnız funksionallığı yoxladığını izah edin.'
    },
    {
        id: 27,
        type: 'technical',
        question: 'Test Plan nədir və nələri ehtiva edir?',
        keywords: ['sənəd', 'strategiya', 'əhatə', 'resurs', 'vaxt', 'risk', 'alət', 'mühit', 'məqsəd', 'plan'],
        tips: 'Test strategiyasını, məqsədlərini, resurslarını və cədvəlini təsvir edən sənəd olduğunu deyin.'
    },
    {
        id: 28,
        type: 'technical',
        question: 'Positive və Negative test nədir?',
        keywords: ['düzgün', 'səhv', 'giriş', 'gözlənilən', 'davranış', 'valid', 'invalid', 'ssenari', 'yoxlama', 'xəta'],
        tips: 'Positive testin sistemin düzgün işlədiyini, Negative testin isə səhvləri necə idarə etdiyini yoxladığını qeyd edin.'
    },
    {
        id: 29,
        type: 'technical',
        question: 'Load Testing və Stress Testing fərqi nədir?',
        keywords: ['yük', 'limit', 'performans', 'sabitlik', 'qırılma', 'istifadəçi', 'trafik', 'maksimum', 'normal', 'davranış'],
        tips: 'Load Testing-in normal və gözlənilən yük altında, Stress Testing-in isə ekstremal yük altında sistemi yoxladığını izah edin.'
    },
    {
        id: 30,
        type: 'technical',
        question: 'Cross-browser testing nədir və niyə vacibdir?',
        keywords: ['brauzer', 'uyğunluq', 'chrome', 'safari', 'firefox', 'görünüş', 'funksionallıq', 'istifadəçi', 'platforma', 'test'],
        tips: 'Tətbiqin müxtəlif brauzerlərdə düzgün işlədiyini təmin etmək üçün vacib olduğunu vurğulayın.'
    },

    // New Situational Questions (3)
    {
        id: 31,
        type: 'situational',
        question: 'Developer "bu baq deyil, feature-dır" deyərsə, necə reaksiya verərsiniz?',
        keywords: ['tələb', 'sənəd', 'analitik', 'menecer', 'istifadəçi', 'təcrübə', 'məntiq', 'sübut', 'müzakirə', 'qərar'],
        tips: 'Tələblərə istinad etmək, istifadəçi təcrübəsini (UX) əsas gətirmək və lazım gələrsə BA/PO ilə dəqiqləşdirmək.'
    },
    {
        id: 32,
        type: 'situational',
        question: 'İstifadəçi istehsalatda (production) kritik baq tapıb, ilk addımınız nə olar?',
        keywords: ['təkrarlamaq', 'təcili', 'hotfix', 'analiz', 'səbəb', 'üzr', 'həll', 'komanda', 'patch', 'deploy'],
        tips: 'Problemi təkrarlamağa çalışmaq, təsir dairəsini müəyyən etmək və dərhal hotfix prosesini başlatmaq.'
    },
    {
        id: 33,
        type: 'situational',
        question: 'Komandaya yeni QA qoşulub, ona necə kömək edərsiniz?',
        keywords: ['onboarding', 'sənədləşmə', 'layihə', 'mentor', 'dəstək', 'tanışlıq', 'proses', 'alət', 'bilik', 'kömək'],
        tips: 'Layihə sənədlərini paylaşmaq, prosesləri izah etmək və suallarına açıq olmaq.'
    },

    // New Behavioral Questions (2)
    {
        id: 34,
        type: 'behavioral',
        question: '5 il sonra özünüzü harada görürsünüz?',
        keywords: ['lider', 'senior', 'avtomatlaşdırma', 'menecer', 'ekspert', 'inkişaf', 'töhfə', 'öyrənmək', 'karyera', 'hədəf'],
        tips: 'Peşəkar inkişaf planlarınızı və şirkətə necə fayda verə biləcəyinizi qeyd edin.'
    },
    {
        id: 35,
        type: 'behavioral',
        question: 'Hansı iş mühitində daha məhsuldar olursunuz?',
        keywords: ['açıq', 'dəstək', 'kommunikasiya', 'sərbəst', 'komanda', 'sakit', 'dinamik', 'motivasiya', 'nəticə', 'mədəniyyət'],
        tips: 'Sizi motivasiya edən mühiti təsvir edin, amma uyğunlaşa bildiyinizi də göstərin.'
    },
    
    // Advanced Technical (Start ID 36)
    {
        id: 36,
        type: 'technical',
        question: 'Test Piramidası nədir?',
        keywords: ['unit', 'integration', 'e2e', 'ui', 'sürət', 'xərc', 'bünövrə', 'avtomatlaşdırma', 'test', 'quruluş'],
        tips: 'Unit testlərin əsasda, UI testlərin isə zirvədə olduğunu izah edin.'
    },
    {
        id: 37,
        type: 'technical',
        question: 'Statik və Dinamik testləşdirmə arasındakı fərq nədir?',
        keywords: ['kod', 'icra', 'review', 'analiz', 'işləmək', 'baxış', 'səhv', 'erkən', 'funksional', 'icrasız'],
        tips: 'Statik testdə kod icra edilmir (review), Dinamik testdə isə kod işə salınır.'
    },
    {
        id: 38,
        type: 'technical',
        question: 'Sərhəd Dəyərləri Analizi (Boundary Value Analysis) nədir?',
        keywords: ['limit', 'minimum', 'maksimum', 'sərhəd', 'test', 'aralıq', 'dəyər', 'giriş', 'səhv', 'texnika'],
        tips: 'Sərhədlərdə (min-1, min, min+1) səhvlərin olma ehtimalının yüksək olduğunu qeyd edin.'
    },
    {
        id: 39,
        type: 'technical',
        question: 'Ekvivalentlik Siniflərinə Bölmə (Equivalence Partitioning) nədir?',
        keywords: ['qrup', 'sinif', 'eyni', 'təmsilçi', 'giriş', 'valid', 'invalid', 'texnika', 'azaltmaq', 'test'],
        tips: 'Giriş məlumatlarını qruplara bölərək test sayını azaltmaq texnikasıdır.'
    },
    {
        id: 40,
        type: 'technical',
        question: 'SQL-də GROUP BY və HAVING fərqi nədir?',
        keywords: ['qruplaşdırma', 'filtr', 'şərt', 'aqreqat', 'sum', 'count', 'sətir', 'qrup', 'nəticə', 'where'],
        tips: 'WHERE sətirləri filtrləyir, HAVING isə qruplaşdırılmış məlumatları (GROUP BY) filtrləyir.'
    },
    {
        id: 41,
        type: 'technical',
        question: 'Git-də commit, push və pull əmrləri nə edir?',
        keywords: ['yaddaş', 'server', 'göndərmək', 'almaq', 'yerli', 'remote', 'repository', 'dəyişiklik', 'sinxronizasiya', 'yeniləmə'],
        tips: 'Commit yerli yaddaşa yazır, Push serverə göndərir, Pull serverdən yeniləmələri alır.'
    },
    {
        id: 42,
        type: 'technical',
        question: 'Mobil testlərdə "Interrupt Testing" nədir?',
        keywords: ['zəng', 'sms', 'bildiriş', 'batareya', 'dayanma', 'arxa fon', 'bərpa', 'tətbiq', 'davam', 'sabitlik'],
        tips: 'Tətbiqin gələn zəng və ya SMS kimi kəsilmələrə necə reaksiya verdiyini yoxlayır.'
    },
    {
        id: 43,
        type: 'technical',
        question: 'API testində Header və Body nədir?',
        keywords: ['meta', 'məlumat', 'payload', 'auth', 'token', 'content-type', 'sorğu', 'cavab', 'json', 'xml'],
        tips: 'Header meta-məlumatları (auth, type), Body isə əsas məlumatı daşıyır.'
    },
    {
        id: 44,
        type: 'technical',
        question: 'Web elementlərini tapmaq üçün XPath və CSS Selector fərqi nədir?',
        keywords: ['lokator', 'sürət', 'sintaksis', 'yol', 'element', 'atribut', 'class', 'id', 'valideyn', 'birbaşa'],
        tips: 'CSS daha sürətli və sadədir, XPath isə daha güclüdür (geri qayıda bilir).'
    },
    {
        id: 45,
        type: 'technical',
        question: 'Agile "mərasimləri" (ceremonies) hansılardır?',
        keywords: ['scrum', 'standup', 'planning', 'review', 'retro', 'görüş', 'gündəlik', 'sprint', 'komanda', 'demo'],
        tips: 'Daily Standup, Sprint Planning, Sprint Review, Sprint Retrospective.'
    },
    {
        id: 46,
        type: 'technical',
        question: 'CI/CD (Continuous Integration/Continuous Delivery) nədir?',
        keywords: ['avtomatlaşdırma', 'pipeline', 'deploy', 'build', 'test', 'sürət', 'inteqrasiya', 'çatdırılma', 'kod', 'server'],
        tips: 'Kodun tez-tez birləşdirilməsi və avtomatik test/deploy edilməsi prosesidir.'
    },
    {
        id: 47,
        type: 'technical',
        question: 'Defect Density nədir?',
        keywords: ['keyfiyyət', 'metrika', 'baq', 'say', 'modul', 'kod', 'sətir', 'sıxlıq', 'ölçü', 'analiz'],
        tips: 'Kodun və ya modulun ölçüsünə düşən baqların sayıdır (Baq sayı / Ölçü).'
    },
    {
        id: 48,
        type: 'technical',
        question: 'Alpha və Beta testinq fərqi nədir?',
        keywords: ['daxili', 'xarici', 'müştəri', 'istifadəçi', 'mühit', 'real', 'qəbul', 'son', 'release', 'feedback'],
        tips: 'Alpha daxili komanda tərəfindən, Beta isə real istifadəçilər tərəfindən edilir.'
    },
    {
        id: 49,
        type: 'technical',
        question: 'RTM (Requirement Traceability Matrix) nədir?',
        keywords: ['izləmə', 'tələb', 'test case', 'əhatə', 'matris', 'sənəd', 'əlaqə', 'yoxlama', 'qa', 'təminat'],
        tips: 'Tələblərin testlər tərəfindən əhatə olunduğunu izləmək üçün istifadə olunan cədvəldir.'
    },
    {
        id: 50,
        type: 'technical',
        question: 'Exploratory Testing nədir?',
        keywords: ['sərbəst', 'planlama', 'öyrənmə', 'təcrübə', 'kəşf', 'ssenarisiz', 'intuitsiya', 'baq', 'test', 'zaman'],
        tips: 'Öncədən yazılmış testlər olmadan, tətbiqi öyrənərək və kəşf edərək test etməkdir.'
    },

    // Advanced Situational (Start ID 51)
    {
        id: 51,
        type: 'situational',
        question: 'Sizə verilən tapşırıq çoxdur və çatdıra bilmirsiniz. Nə edərsiniz?',
        keywords: ['kommunikasiya', 'prioritet', 'menecer', 'kömək', 'risk', 'vaxt', 'xəbərdarlıq', 'realist', 'plan', 'dəstək'],
        tips: 'Menecerlə danışmaq, tapşırıqları prioritetləşdirmək və realistik proqnoz vermək.'
    },
    {
        id: 52,
        type: 'situational',
        question: 'Tələblər bir-biri ilə ziddiyyət təşkil edir. Nə edərsiniz?',
        keywords: ['analiz', 'sual', 'ba', 'po', 'dəqiqləşdirmə', 'ziddiyyət', 'aydınlıq', 'sənəd', 'email', 'görüş'],
        tips: 'Dərhal Business Analyst və ya Product Owner ilə əlaqə saxlayıb aydınlıq gətirmək.'
    },
    {
        id: 53,
        type: 'situational',
        question: 'Test mühiti (Environment) işləmir və vaxt gedir. Nə edərsiniz?',
        keywords: ['devops', 'admin', 'xəbər', 'blok', 'lokal', 'sənəd', 'test case', 'review', 'vaxt', 'səmərəli'],
        tips: 'Müvafiq şəxslərə xəbər vermək və bu vaxtı sənədləşmə və ya test case yazmaq üçün istifadə etmək.'
    },
    {
        id: 54,
        type: 'situational',
        question: 'UI hazır deyil, amma API hazırdır. Testə necə başlayarsınız?',
        keywords: ['postman', 'api', 'backend', 'swagger', 'erkən', 'test', 'request', 'response', 'json', 'inteqrasiya'],
        tips: 'Postman və ya Swagger istifadə edərək API testlərinə başlamaq (API Testing).'
    },
    {
        id: 55,
        type: 'situational',
        question: 'Avtomatlaşdırma testləri tez-tez "fail" olur (Flaky tests). Nə edərsiniz?',
        keywords: ['analiz', 'wait', 'lokator', 'sabitlik', 'debug', 'log', 'kod', 'təkmilləşdirmə', 'retry', 'səbəb'],
        tips: 'Səbəbi araşdırmaq (məsələn, wait problemləri), testləri stabilləşdirmək və ya müvəqqəti deaktiv etmək.'
    },
    {
        id: 56,
        type: 'situational',
        question: 'Release-ə 1 saat qalıb və siz ciddi vizual səhv tapdınız. Nə edərsiniz?',
        keywords: ['risk', 'danışıq', 'pm', 'təsir', 'showstopper', 'funksional', 'qərar', 'komanda', 'bildiriş', 'təxirə'],
        tips: 'Funksionallığa təsir etmirsə, qeyd edib release-ə buraxmaq olar, amma PM ilə razılaşdırılmalıdır.'
    },
    {
        id: 57,
        type: 'situational',
        question: 'Developer sizin tapdığınız baqı düzəltdiyini deyir, amma sizdə hələ də təkrarlanır.',
        keywords: ['cache', 'versiya', 'mühit', 'browser', 'hard refresh', 'birlikdə', 'yoxlama', 'log', 'təmizləmək', 'build'],
        tips: 'Cache təmizləmək, versiyanı yoxlamaq və developerlə birlikdə baxmaq.'
    },

    // Advanced Behavioral (Start ID 58)
    {
        id: 58,
        type: 'behavioral',
        question: 'Tənqidi necə qəbul edirsiniz?',
        keywords: ['açıq', 'inkişaf', 'müsbət', 'öyrənmək', 'fayda', 'feedback', 'konstruktiv', 'təşəkkür', 'dinləmək', 'dəyişiklik'],
        tips: 'Tənqidi inkişaf üçün fürsət kimi gördüyünüzü və konstruktiv rəylərə açıq olduğunuzu deyin.'
    },
    {
        id: 59,
        type: 'behavioral',
        question: 'Sizi işdə nə motivasiya edir?',
        keywords: ['nəticə', 'keyfiyyət', 'öyrənmək', 'komanda', 'uğur', 'həll', 'problem', 'töhfə', 'yenilik', 'maraq'],
        tips: 'Problemləri həll etmək, yeni biliklər öyrənmək və keyfiyyətli məhsul təhvil vermək.'
    },
    {
        id: 60,
        type: 'behavioral',
        question: 'Komanda yoldaşınız işini vaxtında görmür və bu sizə mane olur. Nə edərsiniz?',
        keywords: ['söhbət', 'kömək', 'səbəb', 'həll', 'birbaşa', 'dəstək', 'menecer', 'gecikmə', 'plan', 'nəzakətli'],
        tips: 'Əvvəlcə şəxsən danışıb kömək təklif etmək, problem davam edərsə menecerə bildirmək.'
    },
    {
        id: 61,
        type: 'behavioral',
        question: 'Rutin (təkrar) işlərdən sıxılırsınız?',
        keywords: ['avtomatlaşdırma', 'dəqiqlik', 'səbir', 'keyfiyyət', 'hissə', 'iş', 'vacib', 'yanaşma', 'optimallaşdırma', 'balans'],
        tips: 'Xeyr, bu işin bir hissəsidir. Təkrar işləri avtomatlaşdırmağa çalışıram.'
    },
    {
        id: 62,
        type: 'behavioral',
        question: 'Uğurlu bir QA mühəndisi olmaq üçün ən vacib xüsusiyyət nədir?',
        keywords: ['maraq', 'diqqət', 'ünsiyyət', 'səbir', 'öyrənmək', 'analitik', 'detal', 'keyfiyyət', 'şübhə', 'istifadəçi'],
        tips: 'Detallara diqqət, analitik düşüncə və güclü ünsiyyət bacarıqları.'
    }
];
