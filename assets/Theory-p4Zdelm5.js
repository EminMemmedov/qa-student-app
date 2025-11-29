import{t as e}from"./useTranslation-Cij7gsGk.js";import{t}from"./arrow-left-Dn9zfbXs.js";import{t as n}from"./chevron-right-2JbDa2Hj.js";import{t as r}from"./circle-check-big-DI_XIUgF.js";import{t as i}from"./circle-x-BJgMVqyV.js";import{t as a}from"./info-BVtgLVnH.js";import{t as o}from"./sparkles-foQcEsqR.js";import{t as s}from"./target-Cum1k1S1.js";import{C as c,O as l,S as u,T as d,_ as f,j as p,k as m,o as h,s as g,v as _,y as v}from"./index-DYRLscs1.js";import{t as y}from"./confetti.module-BcdpeI79.js";import{t as b}from"./PageTransition-Ch_VnbX9.js";var x=v(`file-check`,[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`m9 15 2 2 4-4`,key:`1grp1n`}]]);const S=[{id:`qa-basics`,title:`QA Əsasları`,description:`Testləşdirmənin əsas prinsipləri və QA mühəndisinin rolu`,color:`bg-gradient-to-br from-blue-500 to-cyan-500`,content:`### QA Nədir?

**Quality Assurance (QA)** - məhsulun keyfiyyətini təmin etmək üçün həyata keçirilən proseslər toplusudur. QA mühəndisi proqramda səhvləri tapır və onların düzəldilməsini təmin edir.

### Niyə Test Etməliyik?

- **İstifadəçi təcrübəsini yaxşılaşdırır** - Səhvsiz proqram istifadəçiləri məmnun edir
- **Maliyyə itkilərinin qarşısını alır** - Erkən tapılan səhv ucuz başa gələr
- **Brend reputasiyasını qoruyur** - Keyfiyyətli məhsul şirkətin nüfuzunu artırır
- **Təhlükəsizliyi təmin edir** - Kritik səhvlərin qarşısını alır

### Testləşdirmənin 7 Prinsipi

**1. Testləşdirmə səhvlərin varlığını göstərir**
Testlər səhvləri tapa bilər, amma heç bir səhv olmadığını sübut edə bilməz.

**Praktik nümunə:** Registration səhifəsində email validasiyasını test edirsən. "test@test" qəbul olunursa, bu səhvdir. Amma bütün email formatlarını test etmək mümkün deyil.

**2. Tam testləmə mümkün deyil**
Bütün mümkün kombinasiyaları test etmək qeyri-mümkündür.

**Praktik nümunə:** Payment səhifəsində kart nömrəsi 16 rəqəmdir. 10^16 kombinasiya var! Hamısını test etmək mümkün deyil. Risk analizi əsasında ən mühüm halları test edirik.

**3. Erkən testləmə**
Nə qədər tez başlasa, o qədər ucuz başa gələr.

**Praktik nümunə:** Dizayn mərhələsində düymə rənginin çox açıq olduğunu görsən, 5 dəqiqədə düzəlir. Amma production-da tapsan, bütün testləri yenidən keçməli olacaqsan.

**4. Səhvlərin klasterləşməsi**
Səhvlərin 80%-i kodun 20%-ində olur (Pareto prinsipi).

**Praktik nümunə:** Banking modulunda transfer funksiyasında 10 səhv tapsan, həmin funksiyaya daha çox diqqət yetir - daha çox səhv ola bilər.

**5. Pestisid paradoksu**
Eyni testləri təkrar etsən, yeni səhvlər tapmayacaqsan.

**Praktik nümunə:** Hər dəfə "test@test.com" ilə qeydiyyatdan keçirsən. Yeni bir dəfə "test@test" (nöqtəsiz) yoxla - yeni səhv tapa bilərsən.

**6. Testləmə kontekstdən asılıdır**
Bank proqramı ilə oyun fərqli test edilir.

**Praktik nümunə:** E-commerce-də 0.01 saniyə gecikmə normaldır, amma Banking-də pul transferində bu kritikdir.

**7. Səhvsizlik illüziyası**
Proqram səhvsiz işləyir, amma istifadəçi tələblərini ödəmir.

**Praktik nümunə:** Registration formu mükəmməl işləyir, amma istifadəçi "Şifrəni unutdum?" düyməsi axtarır - o yoxdur.

### QA Mühəndisinin Vəzifələri

- Test planlarının hazırlanması
- Test keyslərin yazılması
- Manual və avtomatik testlərin aparılması
- Baq reportlarının yaradılması
- Developerlərlə əməkdaşlıq
- Məhsulun keyfiyyətinə nəzarət

### Praktikada Necə İstifadə Edəcəksən?

**Registration modulunda:**
- Email validasiyasını yoxla (prinsip 2)
- Şifrə uzunluğunu test et (prinsip 4)
- Müxtəlif brauzerlərdə yoxla (prinsip 6)

**Payment modulunda:**
- Kart nömrəsi formatını yoxla (prinsip 1)
- CVV uzunluğunu test et (prinsip 3)
- Luhn alqoritmini yoxla (prinsip 5)

**Banking modulunda:**
- Transfer məbləğini yoxla (prinsip 7)
- Balans yenilənməsini test et (prinsip 4)
- Təsdiq dialoqunu yoxla (prinsip 6)

**E-commerce modulunda:**
- Məhsul sayını test et (prinsip 2)
- Kupon kodunu yoxla (prinsip 5)
- Endirim hesablamasını yoxla (prinsip 1)`,quiz:[{question:`QA-nın əsas məqsədi nədir?`,options:[`Kodu yazmaq`,`Məhsulun keyfiyyətini təmin etmək`,`Dizayn etmək`,`Layihəni idarə etmək`],correct:1},{question:`Erkən testləmənin faydası nədir?`,options:[`Daha çox vaxt aparır`,`Daha bahalıdır`,`Səhvlərin düzəldilməsi daha ucuz başa gəlir`,`Heç bir faydası yoxdur`],correct:2},{question:`Pareto prinsipinə görə səhvlərin 80%-i harada olur?`,options:[`Kodun 20%-ində`,`Bütün kodda bərabər paylanır`,`Dizaynda`,`Database-də`],correct:0}]},{id:`test-types`,title:`Test Növləri`,description:`Funksional, qeyri-funksional və digər test növləri`,color:`bg-gradient-to-br from-green-500 to-emerald-500`,content:`### Test Piramidası

\`\`\`
        /\\
       /E2E\\        ← Az sayda, yavaş, bahalı
      /------\\
     /  API   \\      ← Orta sayda, sürətli
    /----------\\
   / Unit Tests \\   ← Çox sayda, çox sürətli, ucuz
  /--------------\\
\`\`\`

### Funksional Testlər

Proqramın **NƏ ETDİYİNİ** yoxlayır.

**1. Unit Testing (Vahid Test)**
Kodun ən kiçik hissəsini (funksiya, metod) test edir.

**Praktik nümunə:**
\`\`\`javascript
function validateEmail(email) {
  return email.includes('@') && email.includes('.');
}
// Test: validateEmail('test@test.com') → true ✓
// Test: validateEmail('test') → false ✓
\`\`\`

**2. Integration Testing (İnteqrasiya Test)**
Modulların bir-biri ilə əlaqəsini yoxlayır.

**Praktik nümunə:** Registration səhifəsində forma göndəriləndə API-yə sorğu gedirmi? Cavab düzgün işlənirmi?

**3. System Testing (Sistem Test)**
Bütün sistemin bir yerdə işləməsini yoxlayır.

**Praktik nümunə:** İstifadəçi qeydiyyatdan keçir → Login olur → Məhsul alır → Ödəniş edir. Bütün proses işləyirmi?

**4. Acceptance Testing (Qəbul Test)**
Müştərinin tələblərinə uyğunluğu yoxlayır.

**Praktik nümunə:** Müştəri deyir "Qeydiyyat 30 saniyədən az çəkməlidir". Yoxlayırsan - 45 saniyə çəkir. Qəbul edilmir.

### Qeyri-funksional Testlər

Proqramın **NECƏ İŞLƏDİYİNİ** yoxlayır.

**1. Performance Testing (Performans Test)**
Sürət və yükü yoxlayır.

**Praktik nümunələr:**
- **Load Testing:** 1000 istifadəçi eyni anda qeydiyyatdan keçir
- **Stress Testing:** Sistem nə vaxt çökür? 10,000 istifadəçi?
- **Spike Testing:** Qəfil 5000 istifadəçi gəlir (Black Friday)

**Banking modulunda:** Transfer 3 saniyədən çox çəkməməlidir.

**2. Security Testing (Təhlükəsizlik Test)**
Zəiflikləri axtarır.

**Praktik nümunələr:**
- **SQL Injection:** Input-a \`' OR '1'='1\` yaz, işləyirmi?
- **XSS:** \`<script>alert('hack')<\/script>\` yaz, icra olurmu?
- **CSRF:** Başqa saytdan sorğu göndərmək mümkündürmü?

**Registration modulunda:** Şifrə hash-lənərək saxlanılırsa təhlükəsizdir.

**3. Usability Testing (İstifadə Rahatlığı Test)**
İstifadəçi təcrübəsini yoxlayır.

**Praktik nümunələr:**
- Düymələr kifayət qədər böyükdürmü? (44x44px minimum)
- Rənglər oxunaqlıdırmı? (kontrast nisbəti 4.5:1)
- Səhv mesajları aydındırmı?

**E-commerce modulunda:** "Səbətə əlavə et" düyməsi asan tapılırsa, yaxşı UX-dir.

**4. Compatibility Testing (Uyğunluq Test)**
Müxtəlif platformalarda işləməsini yoxlayır.

**Praktik nümunələr:**
- **Brauzer:** Chrome, Safari, Firefox, Edge
- **OS:** Windows, macOS, Linux, iOS, Android
- **Ekran:** Desktop, Tablet, Mobile

**Payment modulunda:** Safari-də kart nömrəsi düzgün formatlanırsa, uyğundur.

### Digər Mühüm Test Növləri

**Regression Testing (Reqressiya Test)**
Yeni dəyişiklik köhnə funksiyaları pozmayıb?

**Praktik nümunə:** Banking-ə yeni "Kredit" funksiyası əlavə etdin. Transfer hələ də işləyirmi?

**Smoke Testing (Tüstü Test)**
Əsas funksiyalar işləyirmi? (Sürətli yoxlama)

**Praktik nümunə:** 
- Login işləyir? ✓
- Qeydiyyat işləyir? ✓
- Ödəniş işləyir? ✓
Hamısı işləyirsə, daha dərin testə keç.

**Sanity Testing (Sağlamlıq Test)**
Düzəliş işləyirmi?

**Praktik nümunə:** Developer email validasiyasını düzəltdi. Yalnız onu yoxla, bütün sistemi yox.

### Praktikada Necə İstifadə Edəcəksən?

**Registration:**
- Funksional: Email formatı düzgündürmü?
- Performance: 1000 qeydiyyat eyni anda işləyir?
- Security: SQL injection mümkündürmü?
- Usability: Forma aydındırmı?

**Payment:**
- Funksional: Kart nömrəsi validasiyası işləyir?
- Performance: Ödəniş 5 saniyədən az?
- Security: CVV şifrələnir?
- Compatibility: Bütün brauzerlə işləyir?

**Banking:**
- Funksional: Transfer düzgün işləyir?
- Performance: 10,000 transfer eyni anda?
- Security: CSRF mümkündürmü?
- Usability: Təsdiq dialoqu aydındırmı?

**E-commerce:**
- Funksional: Səbət düzgün hesablayır?
- Performance: 1000 məhsul yükləmə sürəti?
- Security: XSS mümkündürmü?
- Usability: Checkout prosesi asandırmı?`,quiz:[{question:`Unit Test nəyi yoxlayır?`,options:[`Bütün sistemi`,`Kodun ən kiçik hissəsini`,`İstifadəçi təcrübəsini`,`Təhlükəsizliyi`],correct:1},{question:`Regression Testing nə vaxt aparılır?`,options:[`Layihənin əvvəlində`,`Yalnız sonda`,`Yeni dəyişiklikdən sonra köhnə funksiyaları yoxlamaq üçün`,`Heç vaxt`],correct:2},{question:`Hansı test növü proqramın sürətini yoxlayır?`,options:[`Security Testing`,`Usability Testing`,`Performance Testing`,`Functional Testing`],correct:2}]},{id:`bug-reporting`,title:`Baq Reportu Yazmaq`,description:`Effektiv baq reportu necə yazılır?`,color:`bg-gradient-to-br from-red-500 to-pink-500`,content:`### Yaxşı Baq Reportunun Xüsusiyyətləri

**1. Aydın Başlıq**
Baq nə haqqındadır? Bir cümlə ilə izah et.

❌ Pis: "Düymə işləmir"
✅ Yaxşı: "Registration səhifəsində 'Göndər' düyməsi klikləndikdə heç nə baş vermir"

**2. Təkrarlana Bilən Addımlar**
Başqası baqı təkrar edə bilməlidir.

**Nümunə:**
\`\`\`
Addımlar:
1. Registration səhifəsinə get
2. Email: "test@test" daxil et (nöqtə yoxdur)
3. Şifrə: "123" daxil et (5 simvoldan az)
4. "Göndər" düyməsinə klik et

Gözlənilən nəticə: Validasiya xətası göstərilməlidir
Faktiki nəticə: Forma göndərilir, səhv mesajı yoxdur
\`\`\`

**3. Mühit Məlumatı**
Baq harada baş verir?

- Brauzer: Chrome 120.0
- OS: macOS 14.0
- Ekran: 1920x1080
- Mobil: iPhone 15 Pro, iOS 17.2

**4. Prioritet və Severity**

**Severity (Ciddilik):**
- **Critical:** Proqram çökür, məlumat itirilir
- **Major:** Əsas funksiya işləmir
- **Minor:** Kiçik problem, workaround var
- **Trivial:** Kosmetik səhv

**Priority (Prioritet):**
- **High:** Dərhal düzəldilməlidir
- **Medium:** Növbəti releasedə
- **Low:** Vaxt olduqda

**Nümunələr:**

| Baq | Severity | Priority |
|-----|----------|----------|
| Ödəniş sistemi işləmir | Critical | High |
| Email validasiyası yoxdur | Major | High |
| Düymə rəngi yanlışdır | Minor | Low |
| Mətn səhvi var | Trivial | Low |

### Baq Həyat Dövrü

\`\`\`
New → Assigned → Open → Fixed → Retest → Verified → Closed
                                    ↓
                                Reopened (düzəliş işləmirsə)
\`\`\`

**Statuslar:**

1. **New** - QA yeni baq tapıb
2. **Assigned** - Developer-ə təyin edilib
3. **Open** - Developer üzərində işləyir
4. **Fixed** - Developer düzəldib
5. **Retest** - QA təkrar yoxlayır
6. **Verified** - Düzəliş təsdiqlənib
7. **Closed** - Baq bağlanıb
8. **Reopened** - Düzəliş işləmir, yenidən açılıb

### Praktik Nümunələr

**Nümunə 1: Registration**

**Başlıq:** Email validasiyası yanlış email formatını qəbul edir

**Addımlar:**
1. Registration səhifəsinə get
2. Email: "test@test" daxil et (domain extension yoxdur)
3. "Göndər" klikə

**Gözlənilən:** "Düzgün email daxil edin" xətası
**Faktiki:** Forma qəbul edilir

**Severity:** Major
**Priority:** High
**Mühit:** Chrome 120, macOS 14

---

**Nümunə 2: Payment**

**Başlıq:** CVV 4 rəqəm qəbul edir (maksimum 3 olmalıdır)

**Addımlar:**
1. Payment səhifəsinə get
2. CVV: "1234" daxil et
3. "Ödə" klikə

**Gözlənilən:** "CVV 3 rəqəm olmalıdır" xətası
**Faktiki:** Ödəniş uğurlu

**Severity:** Major
**Priority:** High
**Mühit:** Safari 17, iOS 17

---

**Nümunə 3: Banking**

**Başlıq:** Transfer təsdiq dialoqusuz icra olunur

**Addımlar:**
1. Banking səhifəsinə get
2. Məbləğ: 1000 AZN
3. Alıcı: seç
4. "Köçür" klikə

**Gözlənilən:** Təsdiq dialoqu göstərilməlidir
**Faktiki:** Transfer dərhal icra olunur

**Severity:** Critical
**Priority:** High
**Mühit:** Firefox 121, Windows 11

---

**Nümunə 4: E-commerce**

**Başlıq:** Kupon kodu "FREE100" 100% endirim verir

**Addımlar:**
1. E-commerce səhifəsinə get
2. Kupon: "FREE100" daxil et
3. "Tətbiq et" klikə

**Gözlənilən:** Maksimum 50% endirim
**Faktiki:** 100% endirim (pulsuz)

**Severity:** Critical
**Priority:** High
**Mühit:** Chrome 120, Android 14

### Baq Reportu Şablonu

\`\`\`
Başlıq: [Qısa və aydın təsvir]

Addımlar:
1. [Birinci addım]
2. [İkinci addım]
3. [Üçüncü addım]

Gözlənilən Nəticə:
[Nə olmalıdır?]

Faktiki Nəticə:
[Nə olur?]

Severity: [Critical/Major/Minor/Trivial]
Priority: [High/Medium/Low]

Mühit:
- Brauzer: [Chrome/Safari/Firefox]
- OS: [Windows/macOS/iOS/Android]
- Versiya: [120.0]

Əlavə Məlumat:
- Screenshot: [əlavə et]
- Video: [əlavə et]
- Console log: [əlavə et]
\`\`\`

### Praktikada Necə İstifadə Edəcəksən?

**Registration modulunda:**
- Email validasiyası səhvi → Major, High
- Şifrə görünür (type="text") → Critical, High
- Düymə rəngi yanlış → Minor, Low

**Payment modulunda:**
- Kart nömrəsi 17 rəqəm qəbul edir → Major, High
- CVV görünür → Critical, High
- Loading state yoxdur → Minor, Medium

**Banking modulunda:**
- Balans yenilənmir → Critical, High
- Təsdiq dialoqu yoxdur → Critical, High
- Tarix formatı yanlış → Minor, Low

**E-commerce modulunda:**
- Məhsul sayı mənfi ola bilir → Major, High
- Endirim yanlış hesablanır → Critical, High
- Şəkil yüklənmir → Minor, Medium`,quiz:[{question:`Baq reportunun ən vacib hissəsi nədir?`,options:[`Yalnız başlıq`,`Təkrarlana bilən addımlar`,`Müəllifin adı`,`Tarix`],correct:1},{question:`Severity nəyi göstərir?`,options:[`Baqın nə qədər tez düzəldilməli olduğunu`,`Baqın sistemə təsir dərəcəsini (ciddiliyini)`,`Developerin adını`,`Testin növünü`],correct:1},{question:`Əgər proqram çökürsə, bu hansı Severity-dir?`,options:[`Minor`,`Trivial`,`Critical`,`Major`],correct:2}]},{id:`test-planning`,title:`Test Planlaşdırması`,description:`Test strategiyası və test keyslərin yazılması`,color:`bg-gradient-to-br from-purple-500 to-indigo-500`,content:`### Test Planı Nədir?

Test planı - testləşdirmə prosesinin yol xəritəsidir. Nə test edəcəyini, necə test edəcəyini və nə vaxt test edəcəyini müəyyənləşdirir.

### Test Planının Strukturu

**1. Test Obyekti**
Nə test edəcəksən?

**Nümunə:** "QA Student App - Registration Modulu"

**2. Test Scope (Əhatə Dairəsi)**
Nə test ediləcək və nə test edilməyəcək?

**Test ediləcək:**
- Email validasiyası
- Şifrə uzunluğu
- Telefon formatı
- Doğum tarixi

**Test edilməyəcək:**
- Backend API (ayrıca test edilir)
- Database (ayrıca test edilir)

**3. Test Strategiyası**
Necə test edəcəksən?

- Manual Testing: 80%
- Automated Testing: 20%
- Regression Testing: Hər releasedə
- Performance Testing: Həftədə 1 dəfə

**4. Test Mühiti**
Harada test edəcəksən?

- Brauzer: Chrome, Safari, Firefox
- OS: Windows 11, macOS 14, iOS 17, Android 14
- Ekran: Desktop (1920x1080), Mobile (375x667)

**5. Test Schedule (Cədvəl)**
Nə vaxt test edəcəksən?

- Test planı: 1 gün
- Test keyslərin yazılması: 2 gün
- Test icrası: 3 gün
- Baq reportları: 1 gün
- Regression: 1 gün

**6. Resurslar**
Kimlərlə test edəcəksən?

- QA Lead: 1 nəfər
- QA Engineer: 2 nəfər
- Test Automation: 1 nəfər

### Test Keys Nədir?

Test keys - konkret test ssenariləridir. Hər bir test keys bir funksiyanı yoxlayır.

### Test Keys Strukturu

\`\`\`
Test Keys ID: TC_REG_001
Test Keys Adı: Email validasiyası - düzgün format
Modul: Registration
Prioritet: High

Ön-şərtlər:
- Registration səhifəsi açıqdır

Addımlar:
1. Email input-a "test@example.com" daxil et
2. "Göndər" düyməsinə klik et

Gözlənilən Nəticə:
- Email qəbul edilir
- Növbəti səhifəyə keçid

Faktiki Nəticə:
[Test zamanı doldurulacaq]

Status: [Pass/Fail]
\`\`\`

### Praktik Nümunələr

**Registration Modulu üçün Test Keysləri:**

**TC_REG_001: Email validasiyası - düzgün format**
- Input: "test@example.com"
- Gözlənilən: Qəbul edilir ✓

**TC_REG_002: Email validasiyası - yanlış format**
- Input: "test@test"
- Gözlənilən: "Düzgün email daxil edin" xətası ✓

**TC_REG_003: Şifrə uzunluğu - minimum**
- Input: "12345" (5 simvol)
- Gözlənilən: Qəbul edilir ✓

**TC_REG_004: Şifrə uzunluğu - maksimum**
- Input: "123456" (6 simvol)
- Gözlənilən: "Maksimum 5 simvol" xətası ✓

**TC_REG_005: Telefon formatı - hərflər**
- Input: "abc123"
- Gözlənilən: "Yalnız rəqəmlər" xətası ✓

---

**Payment Modulu üçün Test Keysləri:**

**TC_PAY_001: Kart nömrəsi - düzgün format**
- Input: "4111111111111111" (16 rəqəm)
- Gözlənilən: Qəbul edilir ✓

**TC_PAY_002: Kart nömrəsi - qısa**
- Input: "411111" (6 rəqəm)
- Gözlənilən: "16 rəqəm olmalıdır" xətası ✓

**TC_PAY_003: CVV uzunluğu - 3 rəqəm**
- Input: "123"
- Gözlənilən: Qəbul edilir ✓

**TC_PAY_004: CVV uzunluğu - 4 rəqəm**
- Input: "1234"
- Gözlənilən: "Maksimum 3 rəqəm" xətası ✓

---

**Banking Modulu üçün Test Keysləri:**

**TC_BANK_001: Transfer məbləği - müsbət**
- Input: 100 AZN
- Gözlənilən: Transfer uğurlu ✓

**TC_BANK_002: Transfer məbləği - mənfi**
- Input: -100 AZN
- Gözlənilən: "Mənfi məbləğ ola bilməz" xətası ✓

**TC_BANK_003: Transfer məbləği - balansdan çox**
- Input: 10000 AZN (balans: 500 AZN)
- Gözlənilən: "Kifayət qədər balans yoxdur" xətası ✓

**TC_BANK_004: Təsdiq dialoqu**
- Addım: "Köçür" klikə
- Gözlənilən: Təsdiq dialoqu göstərilir ✓

---

**E-commerce Modulu üçün Test Keysləri:**

**TC_ECOM_001: Məhsul sayı - müsbət**
- Input: 5
- Gözlənilən: Səbətə əlavə edilir ✓

**TC_ECOM_002: Məhsul sayı - mənfi**
- Input: -1
- Gözlənilən: "Mənfi say ola bilməz" xətası ✓

**TC_ECOM_003: Məhsul sayı - stokdan çox**
- Input: 100 (stok: 50)
- Gözlənilən: "Stokda yalnız 50 var" xətası ✓

**TC_ECOM_004: Kupon kodu - düzgün**
- Input: "SAVE20"
- Gözlənilən: 20% endirim tətbiq edilir ✓

### Test Keys Şablonu

\`\`\`
Test Keys ID: TC_[MODUL]_[NÖMRƏ]
Test Keys Adı: [Qısa təsvir]
Modul: [Registration/Payment/Banking/E-commerce]
Prioritet: [High/Medium/Low]
Tip: [Positive/Negative/Boundary]

Ön-şərtlər:
- [Nə hazır olmalıdır?]

Addımlar:
1. [Birinci addım]
2. [İkinci addım]
3. [Üçüncü addım]

Test Data:
- Input: [Daxil ediləcək məlumat]

Gözlənilən Nəticə:
- [Nə olmalıdır?]

Faktiki Nəticə:
- [Nə oldu?]

Status: [Pass/Fail/Blocked]
Qeydlər: [Əlavə məlumat]
\`\`\`

### Test Keys Növləri

**1. Positive Test Keys**
Düzgün məlumatla test edir.

**Nümunə:** Email: "test@test.com" → Qəbul edilir ✓

**2. Negative Test Keys**
Yanlış məlumatla test edir.

**Nümunə:** Email: "test" → Xəta göstərilir ✓

**3. Boundary Test Keys**
Sərhəd dəyərlərini test edir.

**Nümunə:** 
- Şifrə: "1234" (4 simvol) → Xəta (minimum 5)
- Şifrə: "12345" (5 simvol) → Qəbul ✓
- Şifrə: "123456" (6 simvol) → Xəta (maksimum 5)

### Praktikada Necə İstifadə Edəcəksən?

**1. Test Planı Hazırla**
- Scope müəyyənləşdir
- Strategiya seç
- Cədvəl təyin et

**2. Test Keysləri Yaz**
- Hər funksiya üçün minimum 3 test keys:
  - 1 Positive
  - 1 Negative
  - 1 Boundary

**3. Test Keysləri İcra Et**
- Addımları izlə
- Nəticələri qeyd et
- Screenshot çək

**4. Baq Report Yaz**
- Fail olan test keysləri üçün
- Aydın təsvir ver
- Severity/Priority təyin et

**5. Regression Test Et**
- Düzəlişdən sonra
- Bütün test keysləri yenidən
- Yeni baq tapılmadığından əmin ol`,quiz:[{question:`Test Planı nədir?`,options:[`Baq reportu`,`Testləşdirmə prosesinin yol xəritəsi`,`Kodun bir hissəsi`,`Dizayn sənədi`],correct:1},{question:`Test Scope nəyi müəyyən edir?`,options:[`Nəyin test ediləcəyini və edilməyəcəyini`,`Testin qiymətini`,`Developerlərin adlarını`,`Layihənin bitmə tarixini`],correct:0},{question:`Boundary Testing nəyi yoxlayır?`,options:[`Rəngləri`,`Sərhəd dəyərlərini (min/max)`,`Sürəti`,`Təhlükəsizliyi`],correct:1}]}];var C=p(),w=u(),T={"qa-basics":f,"test-types":x,"bug-reporting":s,"test-planning":o},E={"qa-basics":`/theory-qa-basics.png`,"test-types":`/theory-test-types.png`,"bug-reporting":`/theory-bug-reporting.png`,"test-planning":`/theory-test-planning.png`},D=(0,C.memo)(({content:e})=>(0,w.jsx)(`div`,{className:`prose prose-slate dark:prose-invert prose-lg max-w-none`,children:(0,C.useMemo)(()=>e.split(/(?=^### )/gm),[e]).map((e,t)=>e.trim()?(0,w.jsx)(`div`,{className:`content-visibility-auto contain-strict mb-8`,children:e.split(`
`).map((e,t)=>e.trim().startsWith(`###`)?(0,w.jsxs)(`h3`,{className:`text-2xl font-black mt-4 mb-6 text-slate-800 dark:text-white flex items-center gap-3 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm py-4 -mx-4 px-4 z-10 border-b border-slate-100 dark:border-slate-800/50 transition-colors`,children:[(0,w.jsx)(`span`,{className:`w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full flex-shrink-0`}),e.replace(`###`,``).trim()]},t):e.trim().startsWith(`**`)&&e.trim().endsWith(`**`)?(0,w.jsx)(`div`,{className:`bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-5 rounded-r-2xl my-6 shadow-sm`,children:(0,w.jsxs)(`strong`,{className:`text-indigo-900 dark:text-indigo-200 font-bold flex items-start gap-3 leading-relaxed`,children:[(0,w.jsx)(a,{className:`w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5`}),(0,w.jsx)(`span`,{children:e.replace(/\*\*/g,``)})]})},t):e.trim().startsWith(`-`)?(0,w.jsxs)(`li`,{className:`ml-4 list-none pl-0 mb-4 relative flex items-start gap-3 group`,children:[(0,w.jsx)(`div`,{className:`mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 flex-shrink-0 group-hover:scale-125 transition-transform`}),(0,w.jsx)(`span`,{className:`text-slate-700 dark:text-slate-300 leading-loose text-lg`,children:e.replace(`-`,``).trim()})]},t):e.trim().startsWith("```")||e.trim()===``?null:(0,w.jsx)(`p`,{className:`text-slate-600 dark:text-slate-300 leading-loose mb-6 text-lg`,children:e},t))},t):null)})),O=({quiz:t,onComplete:n})=>{let{t:a}=e(),[s,c]=(0,C.useState)({}),[l,u]=(0,C.useState)(!1),d=(e,t)=>{l||c(n=>({...n,[e]:t}))},f=()=>{u(!0),t.every((e,t)=>s[t]===e.correct)&&(y({particleCount:100,spread:70,origin:{y:.6}}),n())},p=Object.keys(s).length===t.length;return(0,w.jsxs)(`div`,{className:`mt-12 bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700`,children:[(0,w.jsxs)(`h3`,{className:`text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3`,children:[(0,w.jsx)(o,{className:`text-yellow-500`}),a(`theory.quiz.title`)]}),(0,w.jsx)(`div`,{className:`space-y-8`,children:t.map((e,t)=>(0,w.jsxs)(`div`,{className:`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700`,children:[(0,w.jsxs)(`p`,{className:`font-bold text-lg text-slate-800 dark:text-slate-200 mb-4`,children:[t+1,`. `,e.question]}),(0,w.jsx)(`div`,{className:`space-y-3`,children:e.options.map((n,a)=>{let o=s[t]===a,c=e.correct===a,u=`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between `;return l?c?u+=`border-green-500 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-300`:o?u+=`border-red-500 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-300`:u+=`border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-500 opacity-50`:o?u+=`border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-300`:u+=`border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300`,(0,w.jsxs)(`button`,{onClick:()=>d(t,a),disabled:l,className:u,children:[(0,w.jsx)(`span`,{className:`font-medium`,children:n}),l&&c&&(0,w.jsx)(r,{size:20,className:`text-green-500`}),l&&o&&!c&&(0,w.jsx)(i,{size:20,className:`text-red-500`})]},a)})})]},t))}),!l&&(0,w.jsx)(`button`,{onClick:f,disabled:!p,className:`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all ${p?`bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transform hover:-translate-y-1`:`bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed`}`,children:a(`theory.quiz.checkResults`)}),l&&(0,w.jsxs)(`div`,{className:`mt-8 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center`,children:[(0,w.jsx)(`p`,{className:`text-xl font-bold text-slate-900 dark:text-white mb-2`,children:a(`theory.quiz.correctAnswers`,{correct:t.filter((e,t)=>s[t]===e.correct).length,total:t.length})}),t.every((e,t)=>s[t]===e.correct)?(0,w.jsx)(`p`,{className:`text-green-600 dark:text-green-400 font-medium`,children:a(`theory.quiz.excellent`)}):(0,w.jsx)(`p`,{className:`text-orange-500 dark:text-orange-400 font-medium`,children:a(`theory.quiz.tryAgain`)})]})]})},k={hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.1}}},A={hidden:{opacity:0,y:20},show:{opacity:1,y:0}};function j(){let{t:i}=e(),a=l(),{moduleId:o}=m(),s=S.find(e=>e.id===o),[u,f]=(0,C.useState)(()=>{let e=c(`theory_progress`,[]);return Array.isArray(e)?e:[]}),p=e=>{if(!u.includes(e)){let t=[...u,e];f(t),d(`theory_progress`,t)}},v=e=>{a(`/theory/${e.id}`)};return(0,w.jsx)(b,{className:`p-6 pt-12 pb-24 min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-300`,children:(0,w.jsx)(g,{mode:`wait`,children:s?(0,w.jsxs)(h.div,{initial:{opacity:0,y:`100%`},animate:{opacity:1,y:0},exit:{opacity:0,y:`100%`},transition:{type:`spring`,damping:25,stiffness:200},className:`fixed inset-0 z-50 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 flex flex-col`,children:[(0,w.jsxs)(`div`,{className:`p-6 border-b border-slate-200 dark:border-slate-700 flex items-center gap-4 bg-white dark:bg-slate-900 sticky top-0 shadow-sm z-50`,children:[(0,w.jsxs)(`button`,{onClick:()=>{a(`/theory`)},className:`flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors group`,children:[(0,w.jsx)(t,{size:18,className:`text-slate-600 dark:text-slate-400 group-hover:-translate-x-1 transition-transform`}),(0,w.jsx)(`span`,{className:`font-medium text-slate-700 dark:text-slate-300`,children:i(`common.back`)})]}),(0,w.jsxs)(`div`,{className:`flex-1`,children:[(0,w.jsx)(`h2`,{className:`text-xl font-bold text-slate-900 dark:text-white line-clamp-1`,children:s.title}),(0,w.jsx)(`p`,{className:`text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1`,children:s.description})]}),(0,w.jsx)(`div`,{className:`w-12`}),` `]}),(0,w.jsx)(`div`,{className:`flex-1 overflow-y-auto overscroll-contain transform-gpu will-change-scroll`,children:(0,w.jsxs)(`div`,{className:`max-w-3xl mx-auto p-6 pb-32`,children:[(0,w.jsxs)(`div`,{className:`mb-8 p-8 bg-indigo-600 sm:bg-gradient-to-br sm:from-indigo-500 sm:to-purple-600 rounded-3xl shadow-sm sm:shadow-xl relative overflow-hidden`,children:[(0,w.jsx)(`div`,{className:`hidden sm:block absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16`}),(0,w.jsx)(`div`,{className:`hidden sm:block absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12`}),(0,w.jsxs)(`div`,{className:`relative z-10`,children:[E[s.id]&&(0,w.jsx)(`div`,{className:`mb-6 flex justify-center`,children:(0,w.jsx)(`img`,{src:E[s.id],alt:s.title,loading:`lazy`,decoding:`async`,width:`192`,height:`192`,className:`w-48 h-48 object-contain rounded-2xl bg-white/10 p-4 pointer-events-none select-none transform-gpu`})}),(0,w.jsx)(`div`,{className:`inline-flex items-center justify-center w-16 h-16 ${s.color} bg-white/20 rounded-2xl mb-4`,children:(()=>(0,w.jsx)(T[s.id]||_,{size:32,className:`text-white`,strokeWidth:2.5}))()}),(0,w.jsx)(`h1`,{className:`text-2xl sm:text-3xl font-black text-white mb-2`,children:s.title}),(0,w.jsx)(`p`,{className:`text-indigo-100 text-base sm:text-lg`,children:s.description})]})]}),(0,w.jsx)(`div`,{className:`bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm sm:shadow-lg border border-slate-100 dark:border-slate-700 mb-8`,children:(0,w.jsx)(D,{content:s.content})}),s.quiz&&(0,w.jsx)(O,{quiz:s.quiz,onComplete:()=>p(s.id)}),(0,w.jsx)(`div`,{className:`mt-12 flex justify-end`,children:(0,w.jsxs)(`button`,{onClick:()=>{let e=S.findIndex(e=>e.id===s.id);e<S.length-1?(a(`/theory/${S[e+1].id}`),window.scrollTo(0,0)):a(`/theory`)},className:`flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1`,children:[i(`theory.quiz.nextModule`),` `,(0,w.jsx)(n,{size:20})]})})]})})]},`detail`):(0,w.jsxs)(h.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[(0,w.jsx)(`header`,{className:`mb-8`,children:(0,w.jsxs)(h.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},className:`flex items-center gap-3 mb-4`,children:[(0,w.jsx)(`div`,{className:`w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30`,children:(0,w.jsx)(_,{size:24,className:`text-white`})}),(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`h1`,{className:`text-4xl font-black text-slate-900 dark:text-white tracking-tight`,children:i(`theory.title`)}),(0,w.jsx)(`p`,{className:`text-slate-500 dark:text-slate-400 font-medium`,children:i(`theory.subtitle`)})]})]})}),(0,w.jsx)(h.div,{variants:k,initial:`hidden`,animate:`show`,className:`space-y-4`,children:S.map(e=>{let t=T[e.id]||_,a=e.id.replace(/-([a-z])/g,e=>e[1].toUpperCase()),o=u.includes(e.id);return(0,w.jsxs)(h.div,{variants:A,whileHover:{scale:1.02,y:-4},whileTap:{scale:.98},onClick:()=>v(e),className:`group bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border-2 border-slate-100 dark:border-slate-700 flex items-center gap-5 cursor-pointer hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden`,children:[(0,w.jsx)(`div`,{className:`absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-indigo-50/50 to-purple-50/0 dark:via-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}),(0,w.jsxs)(`div`,{className:`relative w-16 h-16 rounded-2xl ${e.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`,children:[(0,w.jsx)(t,{size:28,strokeWidth:2.5}),o&&(0,w.jsx)(`div`,{className:`absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 border-2 border-white dark:border-slate-800 shadow-sm`,children:(0,w.jsx)(r,{size:12,fill:`currentColor`})})]}),(0,w.jsxs)(`div`,{className:`flex-1 relative z-10`,children:[(0,w.jsxs)(`h3`,{className:`text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2`,children:[i(`theory.${a}`,e.title),o&&(0,w.jsx)(`span`,{className:`text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold`,children:`Tamamlandı`})]}),(0,w.jsx)(`p`,{className:`text-slate-500 dark:text-slate-400 text-sm leading-snug`,children:e.description})]}),(0,w.jsx)(n,{size:24,className:`text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-300 relative z-10`})]},e.id)})})]},`list`)})})}export{j as default};