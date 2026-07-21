import 'package:flutter/material.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        title: const Text('SentinelX Citizen Shield Mobile'),
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFF334155)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.security, color: Color(0xFF6366F1), size: 36),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        'Citizen Defense Mesh',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      Text(
                        'Real-time Telco Intercept Active',
                        style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              'Quick Safety Actions',
              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
            ),
            const SizedBox(height: 12),
            Expanded(
              child: ListView(
                children: [
                  Card(
                    color: const Color(0xFF1E293B),
                    child: ListTile(
                      leading: const Icon(Icons.phone_locked, color: Colors.redAccent),
                      title: const Text('Report Digital Arrest Call', style: TextStyle(color: Colors.white)),
                      subtitle: const Text('Instantly alert CBI Cyber Cell and freeze bank apps', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
                      trailing: const Icon(Icons.chevron_right, color: Colors.white54),
                    ),
                  ),
                  Card(
                    color: const Color(0xFF1E293B),
                    child: ListTile(
                      leading: const Icon(Icons.camera_alt, color: Colors.amberAccent),
                      title: const Text('Scan Counterfeit Currency Note', style: TextStyle(color: Colors.white)),
                      subtitle: const Text('Macro-topography security thread variance scan', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
                      trailing: const Icon(Icons.chevron_right, color: Colors.white54),
                    ),
                  ),
                  Card(
                    color: const Color(0xFF1E293B),
                    child: ListTile(
                      leading: const Icon(Icons.description, color: Colors.tealAccent),
                      title: const Text('Section 65B Evidence Vault', style: TextStyle(color: Colors.white)),
                      subtitle: const Text('View signed digital evidence PDFs', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
                      trailing: const Icon(Icons.chevron_right, color: Colors.white54),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
