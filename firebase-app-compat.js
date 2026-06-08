(function(global) {
    if (!global.firebase) {
        // 1. Inisialisasi Objek Utama Firebase
        global.firebase = {
            apps: [],
            initializeApp: function(config) {
                console.log("Firebase lokal sukses aktif untuk:", config.projectId);
                return this;
            }
        };

        // 2. Set Nilai Awal Default (Diambil dari memori browser jika ada, jika tidak mulai dari 0)
        global.currentQueueValue = parseInt(localStorage.getItem('antrean_nilai')) || 0;
        global.triggerLayarUpdate = null;

        // 3. Membuat Sistem Mock Database (Meniru Cara Kerja Firestore)
        var mockDb = {
            collection: function(name) {
                return {
                    doc: function(id) {
                        return {
                            // Fungsi Real-time Listener di layar.html
                            onSnapshot: function(callback) {
                                global.triggerLayarUpdate = callback;
                                // Kirim data angka saat ini langsung ketika halaman dibuka
                                setTimeout(function() {
                                    callback({
                                        exists: true,
                                        data: function() { return { nilai: global.currentQueueValue }; }
                                    });
                                }, 100);
                            }
                        };
                    }
                };
            },
            // Fungsi Transaksi Penambah Angka (+1) di admin.html
            runTransaction: function(updateFunction) {
                var transactionObj = {
                    get: function(docRef) {
                        return Promise.resolve({
                            exists: true,
                            data: function() { return { nilai: global.currentQueueValue }; }
                        });
                    },
                    update: function(docRef, data) {
                        global.currentQueueValue = data.nilai;
                        
                        // Picu update angka di tab layar.html secara instan
                        if (typeof global.triggerLayarUpdate === 'function') {
                            global.triggerLayarUpdate({
                                exists: true,
                                data: function() { return { nilai: global.currentQueueValue }; }
                            });
                        }
                        
                        // Kirim sinyal data menembus tab browser via LocalStorage
                        localStorage.setItem('antrean_nilai', global.currentQueueValue);
                        return Promise.resolve();
                    }
                };
                return updateFunction(transactionObj);
            }
        };

        // Hubungkan modul database ke sistem pusat Firebase
        global.firebase.firestore = function() {
            return mockDb;
        };

        // 4. Fitur Jembatan Antar-Tab (Agar Ketukan Tombol Admin Langsung Berefek di Layar)
        window.addEventListener('storage', function(e) {
            if (e.key === 'antrean_nilai') {
                global.currentQueueValue = parseInt(e.newValue) || 0;
                if (typeof global.triggerLayarUpdate === 'function') {
                    global.triggerLayarUpdate({
                        exists: true,
                        data: function() { return { nilai: global.currentQueueValue }; }
                    });
                }
            }
        });
    }
})(window);
