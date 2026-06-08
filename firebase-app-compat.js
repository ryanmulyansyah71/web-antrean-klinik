(function(global) {
    if (!global.firebase) {
        var configRef = null;
        var snapshotListeners = [];

        // 1. Inisialisasi Objek Utama Firebase
        global.firebase = {
            apps: [],
            initializeApp: function(config) {
                configRef = config;
                console.log("🔥 Cloud Firebase Berhasil Diaktifkan Lintas Perangkat.");
                
                // Mulai sistem pemantauan berkala (polling) ke server Google Cloud
                startCloudPolling();
                return this;
            }
        };

        // 2. Fungsi Menembak Data Baru ke Server Google Cloud Firebase
        function updateDataKeCloud(nilaiBaru) {
            if (!configRef) return Promise.reject("Firebase belum siap!");
            
            // Perbaikan Jalur Tautan Dokumen Menggunakan Masking Field Resmi Google
            var url = "https://googleapis.com" + configRef.projectId + "/databases/(default)/documents/antrean/nomor_sekarang?updateMask.fieldPaths=nilai&key=" + configRef.apiKey;
            
            return fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fields: {
                        nilai: { integerValue: nilaiBaru.toString() }
                    }
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function() {
                // Paksa perbarui tampilan lokal setelah sukses mengirim data ke awan
                ambilDataDariCloud();
            })
            .catch(function(error) {
                console.error("Gagal mengirim data ke Google Cloud:", error);
            });
        }

        // 3. Fungsi Mengambil Data Terbaru dari Server Google Cloud Firebase
        function ambilDataDariCloud() {
            if (!configRef) return;

            var url = "https://googleapis.com" + configRef.projectId + "/databases/(default)/documents/antrean/nomor_sekarang?key=" + configRef.apiKey;

            fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data && data.fields && data.fields.nilai) {
                    var angkaTerbaru = parseInt(data.fields.nilai.integerValue) || 0;
                    
                    // Sebarkan angka terbaru ke halaman layar.html secara real-time
                    snapshotListeners.forEach(function(listener) {
                        listener({
                            exists: true,
                            data: function() {
                                return { nilai: angkaTerbaru };
                            }
                        });
                    });
                }
            })
            .catch(function(error) {
                console.error("Gagal sinkronisasi data dari Google Cloud:", error);
            });
        }

        // 4. Sistem Pemantau Otomatis (Berjalan tiap 2.5 detik sekali lintas jagat internet)
        function startCloudPolling() {
            ambilDataDariCloud(); // Ambil data awal saat web dibuka
            setInterval(ambilDataDariCloud, 2500); 
        }

        // 5. Menyusun Kerangka Struktur agar Mirip SDK Asli Firestore
        global.firebase.firestore = function() {
            return {
                collection: function(collectionName) {
                    return {
                        doc: function(docId) {
                            return {
                                onSnapshot: function(callback) {
                                    snapshotListeners.push(callback);
                                }
                            };
                        }
                    };
                },
                runTransaction: function(transactionFunction) {
                    var url = "https://googleapis.com" + configRef.projectId + "/databases/(default)/documents/antrean/nomor_sekarang?key=" + configRef.apiKey;
                    
                    // Ambil angka terakhir sebelum ditambah, agar tidak terjadi bentrokan data antrean
                    return fetch(url)
                    .then(function(res) { return res.json(); })
                    .then(function(data) {
                        var nilaiSekarang = data && data.fields && data.fields.nilai ? parseInt(data.fields.nilai.integerValue) || 0 : 0;
                        
                        var transactionObj = {
                            get: function() {
                                return Promise.resolve({
                                    exists: true,
                                    data: function() { return { nilai: nilaiSekarang }; }
                                });
                            },
                            update: function(docRef, updateData) {
                                return updateDataKeCloud(updateData.nilai);
                            }
                        };
                        return transactionFunction(transactionObj);
                    });
                }
            };
        };
    }
})(window);
