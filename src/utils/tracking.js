class TrackingService {
  constructor() {
    // Hapus properti yang tidak perlu
    this.localStorageKey = 'portfolio_analytics';
  }

  // Fungsi untuk membuka CV tanpa tracking
  openResume = (metadata = {}) => {
    try {
      // Hanya log ke console untuk debugging (opsional)
      console.log('📄 Resume opened');
      
      // Return true untuk menunjukkan aksi berhasil
      return true;
    } catch (error) {
      console.error('Error opening resume:', error);
      return false;
    }
  };

  // Fungsi untuk mengambil statistik (dikosongkan karena tidak perlu tracking)
  getDownloadStats = () => {
    return {
      totalDownloads: 0,
      lastDownload: null,
      downloadsByDate: {},
      uniqueVisitors: 0
    };
  };

  // Export data (dikosongkan)
  exportData = () => {
    return JSON.stringify([], null, 2);
  };

  // Clear data (optional)
  clearData = () => {
    localStorage.removeItem(this.localStorageKey);
  };
}

// Singleton instance
const trackingService = new TrackingService();
export default trackingService;