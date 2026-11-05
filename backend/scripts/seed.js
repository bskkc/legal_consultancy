require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/database');

const User = require('../models/User');
const Category = require('../models/Category');
const Article = require('../models/Article');
const TeamMember = require('../models/TeamMember');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Temizle
    console.log('Mevcut veriler temizleniyor...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Article.deleteMany({});
    await TeamMember.deleteMany({});

    // Admin Kullanıcısı
    console.log('Admin kullanıcısı oluşturuluyor...');
    const adminUser = await User.create({
      username: 'admin',
      password: 'admin123', // bcryptjs otomatik hashler
      role: 'admin',
    });
    console.log('✓ Admin kullanıcısı oluşturuldu:', adminUser.username);

    // Kategoriler
    console.log('\nKategoriler oluşturuluyor...');
    const categories = await Category.insertMany([
      {
        name: 'Aile Hukuku',
        slug: 'aile-hukuku',
        icon: 'FamilyRestroom',
        translations: {
          tr: { name: 'Aile Hukuku', slug: 'aile-hukuku' },
          en: { name: 'Family Law', slug: 'family-law' },
          ru: { name: 'Семейное право', slug: 'semeinoe-pravo' },
          ar: { name: 'قانون الأسرة', slug: 'qanun-al-usra' },
        },
      },
      {
        name: 'İş Hukuku',
        slug: 'is-hukuku',
        icon: 'Business',
        translations: {
          tr: { name: 'İş Hukuku', slug: 'is-hukuku' },
          en: { name: 'Labor Law', slug: 'labor-law' },
          ru: { name: 'Трудовое право', slug: 'trudovoe-pravo' },
          ar: { name: 'قانون العمل', slug: 'qanun-al-amal' },
        },
      },
      {
        name: 'Ticari Hukuk',
        slug: 'ticari-hukuk',
        icon: 'BusinessCenter',
        translations: {
          tr: { name: 'Ticari Hukuk', slug: 'ticari-hukuk' },
          en: { name: 'Commercial Law', slug: 'commercial-law' },
          ru: { name: 'Коммерческое право', slug: 'kommercheskoe-pravo' },
          ar: { name: 'القانون التجاري', slug: 'al-qanun-al-tijari' },
        },
      },
      {
        name: 'Ceza Hukuku',
        slug: 'ceza-hukuku',
        icon: 'Gavel',
        translations: {
          tr: { name: 'Ceza Hukuku', slug: 'ceza-hukuku' },
          en: { name: 'Criminal Law', slug: 'criminal-law' },
          ru: { name: 'Уголовное право', slug: 'ugolovnoe-pravo' },
          ar: { name: 'القانون الجنائي', slug: 'al-qanun-al-janayi' },
        },
      },
      {
        name: 'İdari Hukuk',
        slug: 'idari-hukuk',
        icon: 'AccountBalance',
        translations: {
          tr: { name: 'İdari Hukuk', slug: 'idari-hukuk' },
          en: { name: 'Administrative Law', slug: 'administrative-law' },
          ru: { name: 'Административное право', slug: 'administrativnoe-pravo' },
          ar: { name: 'القانون الإداري', slug: 'al-qanun-al-idari' },
        },
      },
      {
        name: 'Gayrimenkul Hukuku',
        slug: 'gayrimenkul-hukuku',
        icon: 'Home',
        translations: {
          tr: { name: 'Gayrimenkul Hukuku', slug: 'gayrimenkul-hukuku' },
          en: { name: 'Real Estate Law', slug: 'real-estate-law' },
          ru: { name: 'Недвижимость и право', slug: 'nedvizhimost-pravo' },
          ar: { name: 'قانون العقارات', slug: 'qanun-al-aqaarat' },
        },
      },
      {
        name: 'Vergi Hukuku',
        slug: 'vergi-hukuku',
        icon: 'Receipt',
        translations: {
          tr: { name: 'Vergi Hukuku', slug: 'vergi-hukuku' },
          en: { name: 'Tax Law', slug: 'tax-law' },
          ru: { name: 'Налоговое право', slug: 'nalogovoe-pravo' },
          ar: { name: 'قانون الضرائب', slug: 'qanun-al-daraib' },
        },
      },
      {
        name: 'Fikri Mülkiyet',
        slug: 'fikri-mulkiyet',
        icon: 'Copyright',
        translations: {
          tr: { name: 'Fikri Mülkiyet', slug: 'fikri-mulkiyet' },
          en: { name: 'Intellectual Property', slug: 'intellectual-property' },
          ru: { name: 'Интеллектуальная собственность', slug: 'intellektualnaya-sobstvennost' },
          ar: { name: 'الملكية الفكرية', slug: 'al-milkiyah-al-fikriyah' },
        },
      },
      {
        name: 'Tüketici Hukuku',
        slug: 'tuketici-hukuku',
        icon: 'ShoppingCart',
        translations: {
          tr: { name: 'Tüketici Hukuku', slug: 'tuketici-hukuku' },
          en: { name: 'Consumer Law', slug: 'consumer-law' },
          ru: { name: 'Права потребителей', slug: 'prava-potrebitelya' },
          ar: { name: 'قانون المستهلك', slug: 'qanun-al-mustahlik' },
        },
      },
      {
        name: 'Uluslararası Hukuk',
        slug: 'uluslararasi-hukuk',
        icon: 'Public',
        translations: {
          tr: { name: 'Uluslararası Hukuk', slug: 'uluslararasi-hukuk' },
          en: { name: 'International Law', slug: 'international-law' },
          ru: { name: 'Международное право', slug: 'mezhdunarodnoe-pravo' },
          ar: { name: 'القانون الدولي', slug: 'al-qanun-al-dawli' },
        },
      },
    ]);
    console.log(`✓ ${categories.length} kategori oluşturuldu`);

    // Makaleler
    console.log('\nMakaleler oluşturuluyor...');
    const articles = await Article.insertMany([
      {
        category: categories[0]._id,
        title: 'Boşanma Davaları: Adımlar ve Haklarınız',
        slug: 'bosanma-davalari-adimlar-haklariniz',
        image: 'https://via.placeholder.com/400x300?text=Aile+Hukuku',
        summary: 'Boşanma davası süreci hakkında kapsamlı bilgi ve yasal haklar',
        content: '<h2>Boşanma Davaları Hakkında Bilmeniz Gerekenler</h2><p>Boşanma, evlilik ilişkisinin yasal olarak sona erdirilmesidir. Türk Medeni Kanununa göre boşanma davaları iki türlüdür: anlaşmalı ve çekişmeli.</p>',
        translations: {
          tr: {
            title: 'Boşanma Davaları: Adımlar ve Haklarınız',
            slug: 'bosanma-davalari-adimlar-haklariniz',
            summary: 'Boşanma davası süreci hakkında kapsamlı bilgi ve yasal haklar',
            content: '<h2>Boşanma Davaları Hakkında Bilmeniz Gerekenler</h2><p>Boşanma, evlilik ilişkisinin yasal olarak sona erdirilmesidir. Türk Medeni Kanununa göre boşanma davaları iki türlüdür: anlaşmalı ve çekişmeli.</p>',
          },
          en: {
            title: 'Divorce Cases: Steps and Your Rights',
            slug: 'divorce-cases-steps-rights',
            summary: 'Comprehensive information about the divorce process and legal rights',
            content: '<h2>What You Should Know About Divorce</h2><p>Divorce legally terminates a marriage. In Turkish law there are consensual and contested divorce procedures.</p>',
          },
          ru: {
            title: 'Дела о разводе: шаги и ваши права',
            slug: 'delapro-razvode-shagi-prava',
            summary: 'Полная информация о процессе развода и юридических правах',
            content: '<h2>Что нужно знать о разводе</h2><p>Развод — это юридическое прекращение брака. В турецком праве есть согласованный и оспариваемый развод.</p>',
          },
          ar: {
            title: 'قضايا الطلاق: الخطوات وحقوقك',
            slug: 'qadayat-al-talaq-khutuwat-huquqak',
            summary: 'معلومات شاملة حول عملية الطلاق والحقوق القانونية',
            content: '<h2>ما يجب أن تعرفه عن الطلاق</h2><p>الطلاق ينهي الزواج قانونياً. في القانون التركي يوجد الطلاق بالتراضي والمقدَّم عليه النزاع.</p>',
          },
        },
      },
      {
        category: categories[0]._id,
        title: 'Velayet Davası: Çocukların Haklarının Korunması',
        slug: 'velayet-davasi-cocuk-haklari',
        image: 'https://via.placeholder.com/400x300?text=Velayet',
        summary: 'Velayet davası prosedürü ve çocuk hakları hakkında detaylı rehber',
        content: '<h2>Velayet ve Çocuk Hakları</h2><p>Velayet davası, ebeveynler arasında çocuğun yetiştirilmesi konusunda anlaşmazlık olduğunda başlatılır. Mahkeme her zaman çocuğun çıkarını göz önüne alır.</p>',
        translations: {
          tr: {
            title: 'Velayet Davası: Çocukların Haklarının Korunması',
            slug: 'velayet-davasi-cocuk-haklari',
            summary: 'Velayet davası prosedürü ve çocuk hakları hakkında detaylı rehber',
            content: '<h2>Velayet ve Çocuk Hakları</h2><p>Velayet davası, ebeveynler arasında çocuğun yetiştirilmesi konusunda anlaşmazlık olduğunda başlatılır.</p>',
          },
          en: {
            title: "Custody Cases: Protecting Children's Rights",
            slug: 'custody-cases-protecting-children-rights',
            summary: "Guide to custody procedures and children's rights",
            content: `<h2>Custody and Children Rights</h2><p>Custody cases arise when parents disagree on child upbringing. Courts prioritize the child's best interest.</p>`,
          },
          ru: {
            title: 'Дела об опеке: защита прав детей',
            slug: 'opka-dela-zashita-prav-detei',
            summary: 'Руководство по процедурам опеки и правам детей',
            content: '<h2>Опека и права детей</h2><p>Дела об опеке начинаются при разногласиях родителей. Суд ставит интересы ребенка на первое место.</p>',
          },
          ar: {
            title: 'قضايا الحضانة: حماية حقوق الأطفال',
            slug: 'qadayat-al-hadanah-himayat-huquq-al-atfal',
            summary: 'دليل لإجراءات الحضانة وحقوق الأطفال',
            content: '<h2>الحضانة وحقوق الأطفال</h2><p>تثار قضايا الحضانة عند عدم توافق الأهل. تأخذ المحكمة مصلحة الطفل بعين الاعتبار.</p>',
          },
        },
      },
      {
        category: categories[1]._id,
        title: 'İş Sözleşmesi: Haklarınız ve Yükümlülükleriniz',
        slug: 'is-sozlesmesi-haklar-yukumlulukler',
        image: 'https://via.placeholder.com/400x300?text=İş+Hukuku',
        summary: 'İş sözleşmesinin hükümleri, çalışan ve işveren hakları',
        content: '<h2>İş Sözleşmesi Hakkında Bilmeniz Gerekenler</h2><p>İş sözleşmesi, işveren ve çalışan arasındaki hukuki ilişkinin temelini oluşturur. Yazılı olması gerekmektedir.</p>',
        translations: {
          tr: { title: 'İş Sözleşmesi: Haklarınız ve Yükümlülükleriniz', slug: 'is-sozlesmesi-haklar-yukumlulukler', summary: 'İş sözleşmesinin hükümleri, çalışan ve işveren hakları', content: '<p>İş sözleşmesi, işveren ve çalışan arasındaki hukuki ilişkiyi düzenler.</p>' },
          en: { title: 'Employment Contract: Your Rights and Obligations', slug: 'employment-contract-rights-obligations', summary: 'Terms of employment contracts and rights of employees and employers', content: '<p>An employment contract forms the legal relationship between employer and employee.</p>' },
          ru: { title: 'Трудовой договор: ваши права и обязанности', slug: 'trudovoi-dogovor-prava-obyazannosti', summary: 'Условия трудового договора и права работников и работодателей', content: '<p>Трудовой договор регулирует отношения между работодателем и работником.</p>' },
          ar: { title: 'عقد العمل: حقوقك وواجباتك', slug: 'aqd-al-amal-huquqak-wajibatuk', summary: 'شروط عقود العمل وحقوق الموظفين وأصحاب العمل', content: '<p>ينظم عقد العمل العلاقة القانونية بين صاحب العمل والموظف.</p>' },
        },
      },
      // Additional articles can be added similarly; for brevity we add a few more
    ]);
    console.log(`✓ ${articles.length} makale oluşturuldu`);

    // Ekip Üyeleri
    console.log('\nEkip üyeleri oluşturuluyor...');
    const teamMembers = await TeamMember.insertMany([
      {
        name: 'Av. Ali Yılmaz',
        title: 'Kurucu Ortağı & Aile Hukuku Uzmanı',
        photo: 'https://picsum.photos/300/400?random=1',
        bio: 'Ali Yılmaz, 20 yıldan fazla hukuki deneyime sahip ve aile hukuku konusunda uzman avukattır. Türkiye Barolar Birliğine kayıtlı ve İstanbul Barosu üyesidir. Müşterilerine en iyi yasal danışmanlığı sağlama konusunda kendisini adamıştır.',
        socialLinks: {
          email: 'ali.yilmaz@legalconsultancy.com',
          linkedin: 'https://linkedin.com/in/aliyilmaz',
          twitter: 'https://twitter.com/aliyilmaz',
        },
        translations: {
          tr: { name: 'Av. Ali Yılmaz', title: 'Kurucu Ortağı & Aile Hukuku Uzmanı', bio: 'Ali Yılmaz, 20 yıldan fazla hukuki deneyime sahip ve aile hukuku konusunda uzman avukattır.' },
          en: { name: 'Ali Yilmaz, Attorney', title: 'Founding Partner & Family Law Specialist', bio: 'Ali Yilmaz is an attorney with over 20 years of legal experience specializing in family law.' },
          ru: { name: 'Али Йылмаз', title: 'Соучредитель и специалист по семейному праву', bio: 'Али Йылмаз — юрист с более чем 20-летним опытом, специалист по семейному праву.' },
          ar: { name: 'علي يلماظ', title: 'شريك مؤسس ومتخصص في قانون الأسرة', bio: 'علي يلماظ محامٍ لديه أكثر من 20 سنة من الخبرة القانونية ومتخصص في قانون الأسرة.' },
        },
      },
      {
        name: 'Av. Ayşe Kaya',
        title: 'İş Hukuku & Ticari Hukuk Avukatı',
        photo: 'https://picsum.photos/300/400?random=2',
        bio: 'Ayşe Kaya, iş hukuku ve kurumsal hukuk alanında 15 yıllık tecrübeye sahiptir. Şirket kuruluşu, sözleşme hazırlığı ve iş anlaşmazlıklarında danışmanlık sunar.',
        socialLinks: {
          email: 'ayse.kaya@legalconsultancy.com',
          linkedin: 'https://linkedin.com/in/aysekaya',
          twitter: 'https://twitter.com/aysekaya',
        },
        translations: {
          tr: { name: 'Av. Ayşe Kaya', title: 'İş Hukuku & Ticari Hukuk Avukatı', bio: 'Ayşe Kaya, iş hukuku ve kurumsal hukuk alanında 15 yıllık tecrübeye sahiptir.' },
          en: { name: 'Ayse Kaya, Attorney', title: 'Labor & Commercial Law Attorney', bio: 'Ayse Kaya has 15 years of experience in labor and corporate law, advising on company formation and contracts.' },
          ru: { name: 'Айше Кая', title: 'Адвокат по трудовому и коммерческому праву', bio: 'Айше Кая имеет 15 лет опыта в трудовом и корпоративном праве.' },
          ar: { name: 'عائشة كايا', title: 'محامية قانون العمل والتجاري', bio: 'تمتلك عائشة كايا 15 عامًا من الخبرة في قانون العمل والقانون المؤسسي.' },
        },
      },
      {
        name: 'Av. Mehmet Demir',
        title: 'Ceza Hukuku ve Adli Tıp Avukatı',
        photo: 'https://picsum.photos/300/400?random=3',
        bio: 'Mehmet Demir, ceza hukuku alanında özel bir uzmandır. Bireysel savunmadan kurumsal danışmanlığa kadar geniş bir yelpazede hizmet verir.',
        socialLinks: {
          email: 'mehmet.demir@legalconsultancy.com',
          linkedin: 'https://linkedin.com/in/mehmetdemir',
          twitter: 'https://twitter.com/mehmetdemir',
        },
        translations: {
          tr: { name: 'Av. Mehmet Demir', title: 'Ceza Hukuku ve Adli Tıp Avukatı', bio: 'Mehmet Demir, ceza hukuku alanında özel bir uzmandır.' },
          en: { name: 'Mehmet Demir, Attorney', title: 'Criminal Law & Forensics Attorney', bio: 'Mehmet Demir is a specialist in criminal law offering a wide range of defense and advisory services.' },
          ru: { name: 'Мехмет Демир', title: 'Адвокат по уголовному праву и судебной медицине', bio: 'Мехмет Демир — специалист в области уголовного права.' },
          ar: { name: 'محمد دمير', title: 'محامي القانون الجنائي والطب الشرعي', bio: 'محمد دمير متخصص في القانون الجنائي ويقدم خدمات دفاع واستشارات واسعة النطاق.' },
        },
      },
      {
        name: 'Av. Fatma Şahin',
        title: 'İdari Hukuk ve Vergi Hukuku Uzmanı',
        photo: 'https://picsum.photos/300/400?random=4',
        bio: 'Fatma Şahin, kamu hukuku, idari hukuk ve vergi hukuku alanlarında deneyimli avukattır. Vergi müzakereleri ve idari davalarında başarılı sonuçlar elde etmiştir.',
        socialLinks: {
          email: 'fatma.sahin@legalconsultancy.com',
          linkedin: 'https://linkedin.com/in/fatmasahin',
          twitter: 'https://twitter.com/fatmasahin',
        },
        translations: {
          tr: { name: 'Av. Fatma Şahin', title: 'İdari Hukuk ve Vergi Hukuku Uzmanı', bio: 'Fatma Şahin, kamu hukuku ve vergi hukuku alanlarında deneyimlidir.' },
          en: { name: 'Fatma Sahin, Attorney', title: 'Administrative & Tax Law Specialist', bio: 'Fatma Sahin has expertise in public, administrative and tax law.' },
          ru: { name: 'Фатма Шахин', title: 'Специалист по административному и налоговому праву', bio: 'Фатма Шахин обладает опытом в области публичного и налогового права.' },
          ar: { name: 'فاطمة شاهين', title: 'متخصصة في القانون الإداري والضريبي', bio: 'فاطمة شاهين خبيرة في القانون العام والضريبي.' },
        },
      },
      {
        name: 'Av. Hakan Güneş',
        title: 'Gayrimenkul Hukuku ve İmar Hukuku',
        photo: 'https://picsum.photos/300/400?random=5',
        bio: 'Hakan Güneş, gayrimenkul hukuku, inşaat hukuku ve imar hukuku konularında uzmanlaşmıştır. Emlak projelerinin yasal danışmanlığını sağlar.',
        socialLinks: {
          email: 'hakan.gunes@legalconsultancy.com',
          linkedin: 'https://linkedin.com/in/hakangunes',
          twitter: 'https://twitter.com/hakangunes',
        },
        translations: {
          tr: { name: 'Av. Hakan Güneş', title: 'Gayrimenkul Hukuku ve İmar Hukuku', bio: 'Hakan Güneş, gayrimenkul hukuku ve imar hukuku konusunda uzmandır.' },
          en: { name: 'Hakan Gunes, Attorney', title: 'Real Estate & Zoning Law', bio: 'Hakan Gunes specializes in real estate, construction and zoning law.' },
          ru: { name: 'Хакан Гюнеш', title: 'Недвижимость и земельное право', bio: 'Хакан Гюнеш специализируется на недвижимости и градостроительном праве.' },
          ar: { name: 'حكان جونش', title: 'قانون العقارات والتخطيط العمراني', bio: 'حكان جونش متخصص في قانون العقارات والتخطيط.' },
        },
      },
      {
        name: 'Av. Zeynep Arslan',
        title: 'Fikri Mülkiyet ve Patent Hukuku',
        photo: 'https://picsum.photos/300/400?random=6',
        bio: 'Zeynep Arslan, fikri mülkiyet hakları, patent ve tasarım hukuku alanında ileri düzey danışmanlık sunar. Teknoloji şirketlerinin yasal ortağıdır.',
        socialLinks: {
          email: 'zeynep.arslan@legalconsultancy.com',
          linkedin: 'https://linkedin.com/in/zeyneparslan',
          twitter: 'https://twitter.com/zeyneparslan',
        },
        translations: {
          tr: { name: 'Av. Zeynep Arslan', title: 'Fikri Mülkiyet ve Patent Hukuku', bio: 'Zeynep Arslan, fikri mülkiyet haklarında uzmanlaşmıştır.' },
          en: { name: 'Zeynep Arslan, Attorney', title: 'Intellectual Property & Patent Law', bio: 'Zeynep Arslan provides advanced counsel on IP, patents and designs.' },
          ru: { name: 'Зейнеп Арслан', title: 'Интеллектуальная собственность и патентное право', bio: 'Зейнеп Арслан оказывает консультации по ИС и патентному праву.' },
          ar: { name: 'زينب أرسلان', title: 'قانون الملكية الفكرية وبراءات الاختراع', bio: 'زينب أرسلان تقدم استشارات متقدمة في الملكية الفكرية.' },
        },
      },
    ]);
    console.log(`✓ ${teamMembers.length} ekip üyesi oluşturuldu`);

    console.log('\n✅ Seed data başarıyla oluşturuldu!');
    console.log('\nGiriş Bilgileri:');
    console.log('Kullanıcı Adı: admin');
    console.log('Şifre: admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed verisi oluşturulurken hata:', error.message);
    process.exit(1);
  }
};

seedDatabase();
