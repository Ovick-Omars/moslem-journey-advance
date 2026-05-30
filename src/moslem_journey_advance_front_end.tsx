import React, { useState, useEffect } from 'react';
import { 
  Home, Calendar, BookOpen, Clock, CheckSquare, Settings, 
  User, Lock, Mail, ChevronRight, Play, Pause, Plus, Trash2, 
  Edit2, Moon, Sun, Search, AlertCircle, RefreshCw, Check, Book, 
  Heart, Compass, Award, HelpCircle
} from 'lucide-react';

// Default Mock Data for Sholat & Quran so the app is fully functional out-of-the-box
const initialSholatReadings = [
  {
    id: "doa-wudhu",
    category: "Wajib",
    title: "Doa Habis Wudhu",
    arabic: "أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
    translation: "Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Allah semata, tidak ada sekutu bagi-Nya. Dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya. Ya Allah, jadikanlah aku termasuk orang-orang yang bertaubat dan jadikanlah aku termasuk orang-orang yang menyucikan diri."
  },
  {
    id: "doa-adzan",
    category: "Wajib",
    title: "Doa Habis Adzan",
    arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
    translation: "Ya Allah, Pemilik seruan yang sempurna ini dan shalat yang senantiasa ditegakkan, berilah Nabi Muhammad wasilah (kedudukan mulia) dan keutamaan, dan bangkitkanlah beliau di tempat yang terpuji yang telah Engkau janjikan."
  },
  {
    id: "doa-iftitah-1",
    category: "Wajib",
    title: "Doa Iftitah 1 (Allahu Akbar Kabira)",
    arabic: "اللهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَسُبْحَانَ اللهِ بُكْرَةً وَأَصِيلًا",
    translation: "Allah Maha Besar dengan sebesar-besarnya, segala puji bagi Allah dengan pujian yang banyak, dan Maha Suci Allah pada waktu pagi dan petang."
  },
  {
    id: "doa-iftitah-2",
    category: "Wajib",
    title: "Doa Iftitah 2 (Wajjahtu)",
    arabic: "وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا مُسْلِمًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ، إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ، لَا شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا مِنَ الْمُسْلِمِينَ",
    translation: "Aku hadapkan wajahku kepada Tuhan yang menciptakan langit dan bumi dengan cenderung kepada kebenaran dan menyerahkan diri, dan aku bukanlah dari golongan orang-orang musyrik. Sesungguhnya shalatku, ibadahku, hidupku dan matiku hanyalah untuk Allah, Tuhan semesta alam, tidak ada sekutu bagi-Nya. Dan demikianlah yang diperintahkan kepadaku dan aku termasuk orang-orang muslim."
  },
  {
    id: "doa-iftitah-3",
    category: "Wajib",
    title: "Doa Iftitah 3 (Allahumma Baaid)",
    arabic: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنِ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْ خَطَايَايَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ",
    translation: "Ya Allah, jauhkanlah antara aku dan kesalahan-kesalahanku sebagaimana Engkau menjauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari kesalahan-kesalahanku sebagaimana baju putih dibersihkan dari kotoran. Ya Allah, cucilah kesalahan-kesalahanku dengan air, salju dan es."
  },
  {
    id: "tahyat-awal",
    category: "Wajib",
    title: "Bacaan Tahyat Awal",
    arabic: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ, السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
    translation: "Segala penghormatan yang penuh berkah, segenap shalawat yang baik adalah milik Allah. Semoga kesejahteraan, rahmat Allah dan berkah-Nya tercurah kepadamu wahai Nabi. Semoga kesejahteraan tercurah atas kita dan atas hamba-hamba Allah yang shalih. Aku bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Allah, dan aku bersaksi bahwa Muhammad adalah utusan Allah."
  },
  {
    id: "tahyat-akhir",
    category: "Wajib",
    title: "Bacaan Tahyat Akhir",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    translation: "Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan keluarganya sebagaimana Engkau limpahkan rahmat kepada Nabi Ibrahim dan keluarganya. Dan berilah keberkahan kepada Nabi Muhammad dan keluarganya sebagaimana Engkau berikan keberkahan kepada Nabi Ibrahim dan keluarganya, di seluruh alam, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia."
  },
  {
    id: "doa-setelah-tahyat",
    category: "Wajib",
    title: "Doa Setelah Tahyat Akhir",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
    translation: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari azab neraka Jahannam, dari azab kubur, dari fitnah kehidupan dan kematian, serta dari keburukan fitnah Al-Masih Ad-Dajjal."
  },
  {
    id: "sujud-sajadah",
    category: "Wajib",
    title: "Bacaan Sujud Sajadah",
    arabic: "سَجَدَ وَجْهِيَ لِلَّذِي خَلَقَهُ، وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ، فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ",
    translation: "Wajahku bersujud kepada Zat yang menciptakannya, yang membelah pendengaran dan penglihatannya dengan daya dan kekuatan-Nya, maka Maha Suci Allah sebaik-baik Pencipta."
  },
  {
    id: "sujud-sahwi",
    category: "Wajib",
    title: "Bacaan Sujud Sahwi",
    arabic: "سُبْحَانَ مَنْ لَا يَنَامُ وَلَا يَسْهُو",
    translation: "Maha Suci Zat yang tidak tidur dan tidak lupa."
  },
  {
    id: "tahajud-r1",
    category: "Tahajud",
    title: "Bacaan Surat Rakaat 1",
    arabic: "سُورَةُ الْأَعْلَى (سبح اسم ربك الأعلى)",
    translation: "Surat Al-A'la (Disunnahkan membaca surat-surat pendek yang mudah dihafal atau surat Al-A'la di rakaat pertama)."
  },
  {
    id: "tahajud-r2",
    category: "Tahajud",
    title: "Bacaan Surat Rakaat 2",
    arabic: "سُورَةُ الْكَافِرُونَ (قل يا أيها الكافرون)",
    translation: "Surat Al-Kafirun."
  },
  {
    id: "tahajud-r3",
    category: "Tahajud",
    title: "Bacaan Surat Rakaat 3",
    arabic: "سُورَةُ الْإِخْلَاصِ (قل هو الله أحد)",
    translation: "Surat Al-Ikhlas."
  },
  {
    id: "tahajud-r4",
    category: "Tahajud",
    title: "Bacaan Surat Rakaat 4",
    arabic: "سُورَةُ النَّاسِ / الْفَلَقِ",
    translation: "Surat An-Nas atau Al-Falaq."
  },
  {
    id: "witir",
    category: "Witir",
    title: "Doa Setelah Sholat Witir",
    arabic: "سُبْحَانَ الْمَلِكِ الْقُدُّوسِ (٣ كالي) ، اللَّهُمَّ إِنِّي أَعُوذُ بِرِضَاكَ مِنْ سَخَطِكَ، وَبِمُعَافَاتِكَ مِنْ عُقُوبَتِكَ، وَأَعُوذُ بِكَ مِنْكَ لَا أُحْصِي ثَنَاءً عَلَيْكَ أَنْتَ كَمَا أَثْنَيْتَ عَلَى نَفْسِكَ",
    translation: "Maha Suci Allah Raja Yang Maha Suci (3 kali). Ya Allah, sesungguhnya aku berlindung dengan ridha-Mu dari kemurkaan-Mu, dengan keselamatan-Mu dari siksaan-Mu, dan aku berlindung kepada-Mu dari siksaan-Mu. Aku tidak mampu menghitung pujian atas-Mu, Engkau adalah sebagaimana Engkau memuji diri-Mu sendiri."
  },
  {
    id: "dhuha-ayat1",
    category: "Dhuha",
    title: "Ayat Rakaat 1 Sholat Dhuha",
    arabic: "سُورَةُ الشَّمْسِ (والشمس وضحاها)",
    translation: "Surat Asy-Syams (Matahari)."
  },
  {
    id: "dhuha-ayat2",
    category: "Dhuha",
    title: "Ayat Rakaat 2 Sholat Dhuha",
    arabic: "سُورَةُ الضُّحَى (والضحى والليل إذا سجى)",
    translation: "Surat Ad-Dhuha (Waktu Dhuha)."
  },
  {
    id: "dhuha-doa",
    category: "Dhuha",
    title: "Doa Sholat Dhuha",
    arabic: "اللَّهُمَّ إِنَّ الضُّحَاءَ ضُوحَاؤُكَ وَالْبَهَاءَ بَهَاؤُكَ وَالْجَمَالَ جَمَالُوكَ وَالْقُوَّةَ قُوَّتُكَ وَالْقُدْرَةَ قُدْرَتُكَ وَالْعِصْمَةَ عِصْمَتُكَ. اللَّهُمَّ إِنْ كَانَ رِزْقِي فِي السَّمَاءِ فَأَنْزِلْهُ وَإِنْ كَانَ فِي الْأَرْضِ فَأَخْرِجْهُ وَإِنْ كَانَ مُعَسَّرًا فَيَسِّرْهُ وَإِنْ كَانَ حَرَامًا فَطَهِّرْهُ وَإِن *كَانَ بَعِيدًا فَقَرِّبْهُ بِحَقِّ ضُحَائِكَ وَبَهَائِكَ وَجَمَالِكَ وَقُوَّتِكَ وَقُدْرَتِكَ آتِنِي مَا آتَيْتَ عِبَادَكَ الصَّالِحِينَ",
    translation: "Ya Allah, sesungguhnya waktu dhuha adalah waktu dhuha-Mu, keagungan adalah keagungan-Mu, keindahan adalah keindahan-Mu, kekuatan adalah kekuatan-Mu, kekuasaan adalah kekuasaan-Mu, dan penjagaan adalah penjagaan-Mu. Ya Allah, apabila rezekiku berada di langit maka turunkanlah, bila di bumi keluarkanlah, bila sulit mudahkanlah, bila haram bersihkanlah, bila jauh dekatkanlah dengan kebenaran dhuha-Mu, keagungan-Mu, keindahan-Mu, kekuatan-Mu, dan kekuasaan-Mu. Limpahkanlah kepadaku segala apa yang Engkau limpahkan kepada hamba-hamba-Mu yang shaleh."
  },
  {
    id: "jenazah-takbir1",
    category: "Jenazah",
    title: "Bacaan Setelah Takbir 1",
    arabic: "سُورَةُ الْفَاتِحَةِ",
    translation: "Membaca Surat Al-Fatihah setelah Takbir Pertama."
  },
  {
    id: "jenazah-takbir2",
    category: "Jenazah",
    title: "Bacaan Setelah Takbir 2",
    arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ",
    translation: "Membaca Shalawat kepada Nabi Muhammad SAW setelah Takbir Kedua."
  },
  {
    id: "jenazah-takbir3",
    category: "Jenazah",
    title: "Bacaan Takbir ke 3",
    arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ",
    translation: "Ya Allah, ampunilah dia (laki-laki), kasihanilah dia, sejahterakanlah dia, dan maafkanlah dia."
  },
  {
    id: "jenazah-takbir4",
    category: "Jenazah",
    title: "Bacaan Takbir ke 4",
    arabic: "اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ وَلَا تَفْتِنَّا بَعْدَهُ وَاغْفِرْ لَنَا وَلَهُ",
    translation: "Ya Allah, janganlah Engkau halangi kami untuk memperoleh pahalanya dan janganlah Engkau uji kami sepeninggalnya serta ampunilah kami dan dia."
  }
];

const zikirData = {
  habisSholat: [
    { text: "Astaghfirullah (Aku memohon ampun kepada Allah)", count: 3, max: 3 },
    { text: "Subhanallah (Maha Suci Allah)", count: 0, max: 33 },
    { text: "Alhamdulillah (Segala Puji Bagi Allah)", count: 0, max: 33 },
    { text: "Allahu Akbar (Allah Maha Besar)", count: 0, max: 33 },
    { text: "Lailaha illallahu wahdahu la syarika lahu...", count: 0, max: 1 }
  ],
  pagi: [
    { text: "Membaca Ayat Kursi (1x)", count: 0, max: 1 },
    { text: "Membaca Al-Ikhlas, Al-Falaq, An-Nas (3x)", count: 0, max: 3 },
    { text: "Asbahna wa asbahal mulku lillah...", count: 0, max: 1 },
    { text: "Subhanallahi wa bihamdihi (100x)", count: 0, max: 100 }
  ],
  petang: [
    { text: "Membaca Ayat Kursi (1x)", count: 0, max: 1 },
    { text: "Membaca Al-Ikhlas, Al-Falaq, An-Nas (3x)", count: 0, max: 3 },
    { text: "Amsayna wa amsal mulku lillah...", count: 0, max: 1 },
    { text: "Hasbiyallahu la ilaha illa huwa...", count: 0, max: 7 }
  ]
};

// Initial To-Do List
const initialTodos = [
  { id: 1, title: "Membaca Al-Kahfi", deadline: "Setiap Hari Jumat", duration: "30 Menit", status: "Belum Selesai" },
  { id: 2, title: "Sedekah Subuh", deadline: "Harian", duration: "5 Menit", status: "Selesai" },
  { id: 3, title: "Muraja'ah Juz 30", deadline: "Malam Hari", duration: "45 Menit", status: "Belum Selesai" }
];

export default function App() {
  // Navigation & Authentication state
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('moslem_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // App Config & Settings state
  const [gasUrl, setGasUrl] = useState(() => {
    return localStorage.getItem('moslem_gas_url') || '';
  });
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, success, error

  // Functional Data States
  const [sholatReadings, setSholatReadings] = useState(() => {
    const saved = localStorage.getItem('moslem_sholat_readings');
    return saved ? JSON.parse(saved) : initialSholatReadings;
  });
  
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('moslem_todos');
    return saved ? JSON.parse(saved) : initialTodos;
  });

  const [activeZikirTab, setActiveZikirTab] = useState('habisSholat');
  const [zikirState, setZikirState] = useState(zikirData);

  // Authentication Fields
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Quran Explorer State
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [searchSurah, setSearchSurah] = useState('');
  const [loadingSurah, setLoadingSurah] = useState(false);

  // Admin CRUD Modal state
  const [isCrudOpen, setIsCrudOpen] = useState(false);
  const [crudType, setCrudType] = useState('add'); // 'add', 'edit'
  const [crudTarget, setCrudTarget] = useState('sholat'); // 'sholat', 'todo'
  const [currentItem, setCurrentItem] = useState({ id: '', category: 'Wajib', title: '', arabic: '', translation: '', deadline: '', duration: '', status: 'Belum Selesai' });

  // Load Quran surah lists from public equran API
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const res = await fetch('https://equran.id/api/v2/surat');
        const data = await res.json();
        if(data && data.code === 200) {
          setSurahs(data.data);
        }
      } catch (e) {
        console.error("Error loading Surahs:", e);
      }
    };
    fetchSurahs();
  }, []);

  // Sync to GAS when configurations or updates are saved (and GAS Web App URL is present)
  const syncWithSpreadsheet = async (action, payload) => {
    if (!gasUrl) return;
    setSyncStatus('syncing');
    try {
      const response = await fetch(gasUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, payload, user: user?.username || 'Guest' }),
      });
      const resData = await response.json();
      if (resData.status === 'success') {
        setSyncStatus('success');
        setTimeout(() => setSyncStatus('idle'), 3000);
      } else {
        setSyncStatus('error');
      }
    } catch (e) {
      console.error(e);
      setSyncStatus('error');
    }
  };

  // Auth actions
  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!username || !password || (isRegister && !email)) {
      setAuthError('Mohon isi semua data yang diperlukan.');
      return;
    }

    if (isRegister) {
      // Simulate/register on Apps Script + localStorage
      const newUser = { username, email, password, role: username.toLowerCase().includes('admin') ? 'admin' : 'user' };
      
      // Store locally
      localStorage.setItem('moslem_user', JSON.stringify(newUser));
      setUser(newUser);
      setAuthSuccess('Registrasi Berhasil! Selamat Datang.');
      
      // Realtime sheet save
      if (gasUrl) {
        syncWithSpreadsheet('register', newUser);
      }
    } else {
      // Login check
      const savedUser = JSON.parse(localStorage.getItem('moslem_user'));
      if (savedUser && savedUser.username === username && savedUser.password === password) {
        setUser(savedUser);
        setAuthSuccess('Login Berhasil!');
      } else if (username.toLowerCase().includes('admin')) {
        // Fallback for demo admin
        const adminUser = { username, email: 'admin@moslemjourney.com', role: 'admin' };
        setUser(adminUser);
        localStorage.setItem('moslem_user', JSON.stringify(adminUser));
        setAuthSuccess('Login Admin Berhasil!');
      } else {
        // Standard user login
        const defaultUser = { username, email: `${username}@gmail.com`, role: 'user' };
        setUser(defaultUser);
        localStorage.setItem('moslem_user', JSON.stringify(defaultUser));
        setAuthSuccess('Login Berhasil!');
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('moslem_user');
    setActiveTab('home');
  };

  // CRUD handlers for Sholat Readings & To-Do List
  const handleSaveItem = () => {
    if (crudTarget === 'sholat') {
      let updatedReadings = [...sholatReadings];
      if (crudType === 'add') {
        const newItem = { ...currentItem, id: Date.now().toString() };
        updatedReadings.push(newItem);
      } else {
        updatedReadings = updatedReadings.map(item => item.id === currentItem.id ? currentItem : item);
      }
      setSholatReadings(updatedReadings);
      localStorage.setItem('moslem_sholat_readings', JSON.stringify(updatedReadings));
      if (gasUrl) syncWithSpreadsheet('sync_sholat', updatedReadings);
    } else if (crudTarget === 'todo') {
      let updatedTodos = [...todos];
      if (crudType === 'add') {
        const newItem = { ...currentItem, id: Date.now() };
        updatedTodos.push(newItem);
      } else {
        updatedTodos = updatedTodos.map(item => item.id === currentItem.id ? currentItem : item);
      }
      setTodos(updatedTodos);
      localStorage.setItem('moslem_todos', JSON.stringify(updatedTodos));
      if (gasUrl) syncWithSpreadsheet('sync_todos', updatedTodos);
    }
    setIsCrudOpen(false);
  };

  const handleDeleteItem = (target, id) => {
    if (target === 'sholat') {
      const filtered = sholatReadings.filter(item => item.id !== id);
      setSholatReadings(filtered);
      localStorage.setItem('moslem_sholat_readings', JSON.stringify(filtered));
      if (gasUrl) syncWithSpreadsheet('sync_sholat', filtered);
    } else if (target === 'todo') {
      const filtered = todos.filter(item => item.id !== id);
      setTodos(filtered);
      localStorage.setItem('moslem_todos', JSON.stringify(filtered));
      if (gasUrl) syncWithSpreadsheet('sync_todos', filtered);
    }
  };

  // Open Edit/Add Modals
  const openCrudModal = (target, type, item = null) => {
    setCrudTarget(target);
    setCrudType(type);
    if (item) {
      setCurrentItem(item);
    } else {
      setCurrentItem(target === 'sholat' 
        ? { id: '', category: 'Wajib', title: '', arabic: '', translation: '' }
        : { id: '', title: '', deadline: '', duration: '', status: 'Belum Selesai' }
      );
    }
    setIsCrudOpen(true);
  };

  // Zikir Counter actions
  const incrementZikir = (index) => {
    const updated = { ...zikirState };
    const currentZikir = updated[activeZikirTab][index];
    if (currentZikir.count < currentZikir.max) {
      currentZikir.count += 1;
      setZikirState(updated);
    }
  };

  const resetZikir = () => {
    const updated = { ...zikirState };
    updated[activeZikirTab] = updated[activeZikirTab].map(item => ({ ...item, count: 0 }));
    setZikirState(updated);
  };

  // Dynamic Fasting Schedule calculation (Ayyamul Bidh and Monday/Thursday check)
  const getFastingSchedule = () => {
    const today = new Date();
    const days = [];
    // Generating upcoming 14 days of schedule check
    for (let i = 0; i < 14; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const dayName = nextDate.toLocaleDateString('id-ID', { weekday: 'long' });
      const formattedDate = nextDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      
      let isFastingDay = false;
      let fastingType = '';

      // Check Monday or Thursday
      if (dayName === 'Senin' || dayName === 'Kamis') {
        isFastingDay = true;
        fastingType = `Puasa Sunnah ${dayName}`;
      }

      // Simulated Hijri Ayyamul Bidh calculation (estimating for this month/mock dates)
      // Every month, days 13, 14, 15
      const mockHijriDay = ((nextDate.getDate() + 10) % 30) + 1; // Basic simulation of Hijri cycle
      if (mockHijriDay === 13 || mockHijriDay === 14 || mockHijriDay === 15) {
        isFastingDay = true;
        fastingType = `Puasa Sunnah Ayyamul Bidh (1${mockHijriDay-10} Hijriyah)`;
      }

      if (isFastingDay) {
        days.push({ dayName, dateString: formattedDate, type: fastingType });
      }
    }
    return days;
  };

  // Actual Surah data fetcher when clicked
  const handleSelectSurah = async (number) => {
    setLoadingSurah(true);
    try {
      const res = await fetch(`https://equran.id/api/v2/surat/${number}`);
      const data = await res.json();
      if(data && data.code === 200) {
        setSelectedSurah(data.data);
      }
    } catch (e) {
      console.error("Error loading Surah detail:", e);
    } finally {
      setLoadingSurah(false);
    }
  };

  // Filter surahs
  const filteredSurahs = surahs.filter(s => 
    s.namaLatin.toLowerCase().includes(searchSurah.toLowerCase()) ||
    s.arti.toLowerCase().includes(searchSurah.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col max-w-md mx-auto relative border-x border-slate-200 shadow-2xl">
      
      {/* HEADER SECTION */}
      <header className="bg-emerald-900 text-white p-4 sticky top-0 z-40 rounded-b-2xl shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-1">
              <span className="p-1 bg-emerald-700 rounded-lg text-amber-400">🕌</span>
              <h1 className="text-xl font-bold tracking-tight">Moslem Journey</h1>
            </div>
            <p className="text-xs text-emerald-200">Modern Islamic Productivity App</p>
          </div>
          <div className="flex items-center gap-2">
            {gasUrl && (
              <span className={`w-2.5 h-2.5 rounded-full ${syncStatus === 'syncing' ? 'bg-amber-400 animate-ping' : syncStatus === 'error' ? 'bg-red-500' : 'bg-green-400'}`} title="Spreadsheet Sync Status"></span>
            )}
            {user ? (
              <div className="flex items-center gap-1 bg-emerald-800/80 px-2 py-1 rounded-full text-xs">
                <User size={14} className="text-amber-400" />
                <span className="font-semibold">{user.username} ({user.role})</span>
              </div>
            ) : (
              <button 
                onClick={() => setActiveTab('profile')} 
                className="bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-3 py-1 rounded-full text-xs transition duration-250 shadow"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* BODY CONTENT / PAGES */}
      <main className="flex-1 p-4 pb-24 overflow-y-auto">

        {/* 1. HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* HELLO SECTION */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                <Compass size={150} />
              </div>
              <p className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">Teman Setia Harianmu</p>
              <h2 className="text-2xl font-bold mt-1">Assalamu'alaikum, {user ? user.username : 'Teman Mulia'}</h2>
              <p className="text-emerald-100 text-sm mt-1">"Maka sesungguhnya bersama kesulitan ada kemudahan." (QS. Al-Insyirah: 5)</p>
              
              <div className="mt-4 flex items-center gap-3 bg-emerald-950/40 p-3 rounded-xl border border-emerald-700/50">
                <div className="p-2 bg-amber-500 rounded-lg text-emerald-950">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs text-emerald-200">Sholat Terdekat</p>
                  <p className="font-semibold text-amber-300">Dzuhur - 11:58 WIB</p>
                </div>
              </div>
            </div>

            {/* QUICK STATS / ACTION MODULES */}
            <div className="grid grid-cols-2 gap-4">
              <div onClick={() => setActiveTab('sholat')} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80 flex flex-col justify-between hover:border-emerald-500 cursor-pointer transition">
                <span className="text-2xl">📖</span>
                <div>
                  <h3 className="font-bold text-slate-800 mt-2">Doa &amp; Sholat</h3>
                  <p className="text-xs text-slate-400">Panduan ibadah harian</p>
                </div>
              </div>
              <div onClick={() => setActiveTab('quran')} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80 flex flex-col justify-between hover:border-emerald-500 cursor-pointer transition">
                <span className="text-2xl">🕌</span>
                <div>
                  <h3 className="font-bold text-slate-800 mt-2">Al-Quran</h3>
                  <p className="text-xs text-slate-400">Terjemahan &amp; Audio</p>
                </div>
              </div>
              <div onClick={() => setActiveTab('zikir')} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80 flex flex-col justify-between hover:border-emerald-500 cursor-pointer transition">
                <span className="text-2xl">📿</span>
                <div>
                  <h3 className="font-bold text-slate-800 mt-2">Zikir Digital</h3>
                  <p className="text-xs text-slate-400">Pagi, Petang, &amp; Sholat</p>
                </div>
              </div>
              <div onClick={() => setActiveTab('puasa')} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80 flex flex-col justify-between hover:border-emerald-500 cursor-pointer transition">
                <span className="text-2xl">📅</span>
                <div>
                  <h3 className="font-bold text-slate-800 mt-2">Puasa Sunnah</h3>
                  <p className="text-xs text-slate-400">Jadwal &amp; Pengingat</p>
                </div>
              </div>
            </div>

            {/* ADHAN TIMINGS BLOCK */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
                  <span className="text-emerald-600">⏰</span> Jadwal Sholat Hari Ini
                </h3>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">Bogor</span>
              </div>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <p className="text-slate-400 font-medium">Subuh</p>
                  <p className="font-bold text-slate-700 mt-1">04:36</p>
                </div>
                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-emerald-700 font-semibold">Dhuha</p>
                  <p className="font-bold text-emerald-800 mt-1">06:15</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <p className="text-slate-400 font-medium">Dzuhur</p>
                  <p className="font-bold text-slate-700 mt-1">11:58</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <p className="text-slate-400 font-medium">Ashar</p>
                  <p className="font-bold text-slate-700 mt-1">15:18</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <p className="text-slate-400 font-medium">Maghrib</p>
                  <p className="font-bold text-slate-700 mt-1">17:54</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CALENDAR TAB */}
        {activeTab === 'calendar' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80 text-center">
              <h2 className="text-lg font-bold text-slate-800 mb-2">Kalender Hijriyah &amp; Gregorian</h2>
              <p className="text-xs text-slate-500 mb-4">Pantau penanggalan masehi dan hijriyah secara real-time</p>
              
              {/* Islamic Finder Widget */}
              <div className="flex justify-center bg-slate-100 p-2 rounded-xl border border-slate-200 shadow-inner overflow-hidden">
                <iframe 
                  id="g2hFrame" 
                  title="islamic-calendar" 
                  style={{ width: "280px", height: "312px", border: "none" }} 
                  scrolling="no" 
                  src="https://www.islamicfinder.org/islamic-calendar/widgetGregorian?type=Gregorian"
                ></iframe>
              </div>
              <div className="mt-3 text-xs text-emerald-700 font-medium flex items-center justify-center gap-1.5">
                <AlertCircle size={14} /> Widget resmi dirujuk dari IslamicFinder
              </div>
            </div>
          </div>
        )}

        {/* 3. SHOLAT & READINGS TAB */}
        {activeTab === 'sholat' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Panduan Doa &amp; Sholat</h2>
              {user?.role === 'admin' && (
                <button 
                  onClick={() => openCrudModal('sholat', 'add')} 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 transition"
                >
                  <Plus size={14} /> Tambah Doa
                </button>
              )}
            </div>

            {/* CATEGORY SELECTOR */}
            <div className="flex gap-2 overflow-x-auto pb-1.5">
              {['Wajib', 'Tahajud', 'Witir', 'Dhuha', 'Jenazah'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCurrentItem(prev => ({ ...prev, category: cat }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                    currentItem.category === cat 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'Wajib' ? 'Sholat Wajib' : `Sholat ${cat}`}
                </button>
              ))}
            </div>

            {/* LIST OF READINGS */}
            <div className="space-y-3">
              {sholatReadings
                .filter(item => item.category === currentItem.category)
                .map((reading) => (
                  <div key={reading.id} className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm relative group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                        {reading.category}
                      </span>
                      {user?.role === 'admin' && (
                        <div className="flex gap-1">
                          <button 
                            onClick={() => openCrudModal('sholat', 'edit', reading)} 
                            className="p-1 hover:text-emerald-600 text-slate-400"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteItem('sholat', reading.id)} 
                            className="p-1 hover:text-red-600 text-slate-400"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 text-base mb-3">{reading.title}</h3>
                    
                    {/* Arabic Text */}
                    <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/30 mb-3 text-right">
                      <p className="text-xl font-arabic text-emerald-950 font-semibold leading-loose tracking-wide" style={{ fontFamily: "Amiri, serif", direction: "rtl" }}>
                        {reading.arabic}
                      </p>
                    </div>

                    {/* Translation */}
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Terjemahan:</p>
                      <p className="text-xs text-slate-600 leading-relaxed italic">{reading.translation}</p>
                    </div>
                  </div>
                ))}
              {sholatReadings.filter(item => item.category === currentItem.category).length === 0 && (
                <div className="text-center py-12 text-slate-400 bg-white rounded-xl border">
                  Belum ada bacaan untuk kategori ini.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. ZIKIR TAB */}
        {activeTab === 'zikir' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Zikir Harian</h2>
              <button 
                onClick={resetZikir}
                className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition"
              >
                <RefreshCw size={12} /> Reset Semua
              </button>
            </div>

            {/* sub tab selector */}
            <div className="flex gap-1.5 bg-slate-200/60 p-1 rounded-xl">
              <button 
                onClick={() => setActiveZikirTab('habisSholat')} 
                className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition ${activeZikirTab === 'habisSholat' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:bg-white/40'}`}
              >
                Habis Sholat
              </button>
              <button 
                onClick={() => setActiveZikirTab('pagi')} 
                className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition ${activeZikirTab === 'pagi' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:bg-white/40'}`}
              >
                Zikir Pagi
              </button>
              <button 
                onClick={() => setActiveZikirTab('petang')} 
                className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition ${activeZikirTab === 'petang' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:bg-white/40'}`}
              >
                Zikir Petang
              </button>
            </div>

            {/* List of zikirs and custom counters */}
            <div className="space-y-3">
              {zikirState[activeZikirTab].map((zikir, idx) => (
                <div 
                  key={idx} 
                  onClick={() => incrementZikir(idx)}
                  className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-emerald-500 cursor-pointer shadow-sm flex justify-between items-center transition relative overflow-hidden"
                >
                  <div className="flex-1 pr-4">
                    <p className="text-sm text-slate-700 font-semibold leading-relaxed">{zikir.text}</p>
                  </div>
                  
                  {/* Circular Counter Indicator */}
                  <div className="flex flex-col items-center justify-center min-w-[64px] h-[64px] rounded-full bg-emerald-50 border border-emerald-100 relative">
                    <span className="text-xs text-slate-400 font-medium">Batas: {zikir.max}</span>
                    <span className="text-lg font-bold text-emerald-800">{zikir.count}</span>
                    {zikir.count >= zikir.max && (
                      <div className="absolute inset-0 bg-emerald-700/90 rounded-full flex items-center justify-center text-white">
                        <Check size={24} className="font-bold" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. FASTING SCHEDULE TAB */}
        {activeTab === 'puasa' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-2xl shadow-md">
              <h2 className="text-lg font-bold flex items-center gap-1.5">
                <Moon size={18} /> Jadwal Puasa Sunnah
              </h2>
              <p className="text-xs text-amber-100 mt-1">Jadwal Puasa Senin-Kamis &amp; Ayyamul Bidh terbaru (kecuali pada hari-hari tasyrik/raya).</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mendatang dalam 2 Minggu</h3>
              {getFastingSchedule().map((fast, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{fast.type}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{fast.dayName}, {fast.dateString}</p>
                  </div>
                  <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                    Dianjurkan
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. AL-QURAN TAB */}
        {activeTab === 'quran' && (
          <div className="space-y-4">
            {/* Search and header */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <BookOpen size={18} className="text-emerald-700" /> Jelajahi Al-Quran
              </h2>
              <p className="text-xs text-slate-400 mb-3">Dirujuk dari quran.com dengan terjemahan Indonesia &amp; Audio</p>
              
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Cari Surat (misal: Al-Fatihah)..." 
                  value={searchSurah}
                  onChange={(e) => setSearchSurah(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
              </div>
            </div>

            {/* Back button if Surah is selected */}
            {selectedSurah ? (
              <div className="space-y-4">
                <button 
                  onClick={() => setSelectedSurah(null)}
                  className="text-xs text-emerald-700 font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-1 shadow-sm transition"
                >
                  &larr; Kembali ke Daftar Surat
                </button>

                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <div className="text-center pb-4 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800">{selectedSurah.namaLatin} ({selectedSurah.nama})</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{selectedSurah.arti} &bull; {selectedSurah.jumlahAyat} Ayat</p>
                    
                    {/* Audio Player */}
                    {selectedSurah.audioFull?.['01'] && (
                      <div className="mt-4 flex justify-center">
                        <audio controls className="w-full max-w-[280px] h-8 rounded-lg">
                          <source src={selectedSurah.audioFull['01']} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                  </div>

                  {/* Ayat Content */}
                  <div className="space-y-6 mt-6">
                    {selectedSurah.ayat.map((ay) => (
                      <div key={ay.nomorAyat} className="pb-6 border-b border-slate-100 last:border-none">
                        <div className="flex justify-between items-center mb-3 text-slate-400 text-xs">
                          <span className="font-bold bg-slate-100 px-2.5 py-1 rounded-full">{ay.nomorAyat}</span>
                          <span className="text-emerald-700 font-medium">QS. {selectedSurah.nomor}:{ay.nomorAyat}</span>
                        </div>
                        <p className="text-right text-xl leading-loose font-arabic text-slate-800 font-semibold mb-3" style={{ fontFamily: "Amiri, serif", direction: "rtl" }}>
                          {ay.teksArab}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium mb-1">
                          {ay.teksLatin}
                        </p>
                        <p className="text-xs text-slate-400 italic">
                          " {ay.teksIndonesia} "
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* SURAH LIST GRID */
              <div className="grid grid-cols-2 gap-3">
                {filteredSurahs.map((surah) => (
                  <div 
                    key={surah.nomor}
                    onClick={() => handleSelectSurah(surah.nomor)}
                    className="bg-white p-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:shadow transition duration-200 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs bg-emerald-50 text-emerald-800 font-extrabold w-5 h-5 flex items-center justify-center rounded-full">
                        {surah.nomor}
                      </span>
                      <span className="text-xs font-arabic text-emerald-800 font-bold">{surah.nama}</span>
                    </div>
                    <div className="mt-3">
                      <h4 className="font-bold text-slate-800 text-xs truncate">{surah.namaLatin}</h4>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{surah.arti}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 7. TO-DO LIST TAB */}
        {activeTab === 'todo' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Rencana Kerja Harian</h2>
              {user?.role === 'admin' && (
                <button 
                  onClick={() => openCrudModal('todo', 'add')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 shadow-sm transition"
                >
                  <Plus size={14} /> Tambah Kerja
                </button>
              )}
            </div>

            {/* Custom Table styling for mobile */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-emerald-800 text-white font-bold">
                    <th className="p-3">Rencana Kerja</th>
                    <th className="p-3">Deadline</th>
                    <th className="p-3">Durasi</th>
                    <th className="p-3">Status</th>
                    {user?.role === 'admin' && <th className="p-3">Aksi</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {todos.map((todo) => (
                    <tr key={todo.id} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-800">{todo.title}</td>
                      <td className="p-3 text-slate-500">{todo.deadline}</td>
                      <td className="p-3 text-slate-500">{todo.duration}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${todo.status === 'Selesai' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {todo.status}
                        </span>
                      </td>
                      {user?.role === 'admin' && (
                        <td className="p-3">
                          <div className="flex gap-1.5">
                            <button 
                              onClick={() => openCrudModal('todo', 'edit', todo)}
                              className="text-slate-400 hover:text-emerald-600"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem('todo', todo.id)}
                              className="text-slate-400 hover:text-red-600"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROFILE / AUTH / SETTINGS TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            {/* If logged in, show Settings/Profile Panel */}
            {user ? (
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-800 text-2xl font-bold mb-3">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-base font-bold text-slate-800">{user.username}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 font-bold rounded-full text-xs">
                    Level: {user.role.toUpperCase()}
                  </span>

                  <button 
                    onClick={handleLogout}
                    className="w-full mt-6 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-bold py-2.5 rounded-xl transition"
                  >
                    Log Out
                  </button>
                </div>

                {/* SPREADSHEET / DEPLOYMENT URL COUPLING */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-1.5">
                    <Settings size={16} className="text-emerald-700" /> Integrasi Database Realtime
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">Hubungkan aplikasi frontend dengan Google Apps Script Web App URL Anda.</p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Google Apps Script Web App URL</label>
                      <input 
                        type="url" 
                        placeholder="https://script.google.com/macros/s/.../exec"
                        value={gasUrl}
                        onChange={(e) => {
                          setGasUrl(e.target.value);
                          localStorage.setItem('moslem_gas_url', e.target.value);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    {gasUrl && (
                      <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-[11px] text-emerald-800 leading-relaxed">
                        <strong>Koneksi Terdeteksi:</strong> Aplikasi siap mengirimkan data registrasi, sholat, dan to-do list ke Spreadsheet Anda secara realtime.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* LOGIN & REGISTER PANELS */
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-center mb-6">
                  <h2 className="text-lg font-bold text-slate-800">{isRegister ? 'Registrasi Baru' : 'Masuk Akun'}</h2>
                  <p className="text-xs text-slate-400 mt-1">Gunakan username yang mengandung kata "admin" untuk menguji fitur Admin.</p>
                </div>

                {authError && (
                  <div className="bg-red-50 text-red-700 border border-red-100 p-3 rounded-xl text-xs mb-4 flex items-center gap-1.5">
                    <AlertCircle size={14} /> {authError}
                  </div>
                )}
                {authSuccess && (
                  <div className="bg-green-50 text-green-700 border border-green-100 p-3 rounded-xl text-xs mb-4 flex items-center gap-1.5">
                    <Check size={14} /> {authSuccess}
                  </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                  {isRegister && (
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Alamat Email</label>
                      <div className="relative">
                        <input 
                          type="email" 
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                        <Mail className="absolute left-3 top-2.5 text-slate-400" size={14} />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">Username</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Contoh: raflianoadmin"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                      <User className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">Kata Sandi</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        placeholder="Kata Sandi Minimal 6 Karakter"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                      <Lock className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs transition shadow mt-6"
                  >
                    {isRegister ? 'Register Sekarang' : 'Masuk Aplikasi'}
                  </button>
                </form>

                <div className="text-center mt-6 pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold"
                  >
                    {isRegister ? 'Sudah memiliki akun? Masuk' : 'Belum punya akun? Buat Baru'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* FOOTER WATERMARK ELEGAN */}
      <footer className="text-center py-2 bg-white text-[10px] text-slate-400 font-medium border-t border-slate-100 tracking-wider absolute bottom-[68px] w-full">
        Created by Rafliano
      </footer>

      {/* BOTTOM PWA NAVIGATION BAR */}
      <nav className="bg-white border-t border-slate-200/80 sticky bottom-0 z-40 px-3 py-2 flex justify-between items-center max-w-md mx-auto rounded-t-2xl shadow-xl">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${activeTab === 'home' ? 'text-emerald-800 font-bold bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Home size={18} />
          <span className="text-[9px] mt-1">Beranda</span>
        </button>

        <button 
          onClick={() => setActiveTab('calendar')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${activeTab === 'calendar' ? 'text-emerald-800 font-bold bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Calendar size={18} />
          <span className="text-[9px] mt-1">Kalender</span>
        </button>

        <button 
          onClick={() => setActiveTab('sholat')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${activeTab === 'sholat' ? 'text-emerald-800 font-bold bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Compass size={18} />
          <span className="text-[9px] mt-1">Doa/Sholat</span>
        </button>

        <button 
          onClick={() => setActiveTab('quran')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${activeTab === 'quran' ? 'text-emerald-800 font-bold bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <BookOpen size={18} />
          <span className="text-[9px] mt-1">Al-Quran</span>
        </button>

        <button 
          onClick={() => setActiveTab('todo')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${activeTab === 'todo' ? 'text-emerald-800 font-bold bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <CheckSquare size={18} />
          <span className="text-[9px] mt-1">Tugas</span>
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${activeTab === 'profile' ? 'text-emerald-800 font-bold bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <User size={18} />
          <span className="text-[9px] mt-1">Profil</span>
        </button>
      </nav>

      {/* CRUD MODAL FOR ADMINS */}
      {isCrudOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 overflow-y-auto max-h-[90vh]">
            <h3 className="font-bold text-slate-800 text-sm mb-4">
              {crudType === 'add' ? 'Tambah Item' : 'Edit Item'} ({crudTarget === 'sholat' ? 'Doa' : 'Rencana Kerja'})
            </h3>

            {crudTarget === 'sholat' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Kategori</label>
                  <select 
                    value={currentItem.category}
                    onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Wajib">Wajib</option>
                    <option value="Tahajud">Tahajud</option>
                    <option value="Witir">Witir</option>
                    <option value="Dhuha">Dhuha</option>
                    <option value="Jenazah">Jenazah</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Nama Bacaan / Doa</label>
                  <input 
                    type="text" 
                    value={currentItem.title}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Teks Arab</label>
                  <textarea 
                    value={currentItem.arabic}
                    onChange={(e) => setCurrentItem({ ...currentItem, arabic: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none min-h-[80px]"
                    style={{ direction: 'rtl' }}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Terjemahan</label>
                  <textarea 
                    value={currentItem.translation}
                    onChange={(e) => setCurrentItem({ ...currentItem, translation: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none min-h-[80px]"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Nama Rencana Kerja</label>
                  <input 
                    type="text" 
                    value={currentItem.title}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Deadline / Frekuensi</label>
                  <input 
                    type="text" 
                    value={currentItem.deadline}
                    onChange={(e) => setCurrentItem({ ...currentItem, deadline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Estimasi Durasi</label>
                  <input 
                    type="text" 
                    value={currentItem.duration}
                    onChange={(e) => setCurrentItem({ ...currentItem, duration: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status Eksekusi</label>
                  <select 
                    value={currentItem.status}
                    onChange={(e) => setCurrentItem({ ...currentItem, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Belum Selesai">Belum Selesai</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <button 
                onClick={() => setIsCrudOpen(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 rounded-xl text-xs transition"
              >
                Batal
              </button>
              <button 
                onClick={handleSaveItem}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-xl text-xs transition shadow"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}