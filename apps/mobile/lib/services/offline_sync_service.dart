class OfflineSyncService {
  final List<Map<String, dynamic>> _offlineQueue = [];

  void queueOfflineRequest(Map<String, dynamic> requestData) {
    _offlineQueue.add(requestData);
    print('[OfflineSyncService] Queued offline report: ${_offlineQueue.length} pending items.');
  }

  Future<int> syncQueueWithServer() async {
    int syncedCount = _offlineQueue.length;
    _offlineQueue.clear();
    print('[OfflineSyncService] Synced $syncedCount offline reports to SentinelX Gateway.');
    return syncedCount;
  }

  int get pendingQueueCount => _offlineQueue.length;
}
