import 'dart:convert';
import 'package:http/http' as http;

class ApiService {
  final String baseUrl;

  ApiService({this.baseUrl = 'http://10.0.2.2:8000'}); // 10.0.2.2 for Android emulator

  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/v1/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Login failed: ${response.body}');
    }
  }

  Future<Map<String, dynamic>> submitScamReport(String callerNumber, String transcript, String token) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/v1/scam/analyse'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
        'x-correlation-id': 'corr-mobile-${DateTime.now().millisecondsSinceEpoch}',
      },
      body: jsonEncode({
        'caller_number': callerNumber,
        'call_transcript': transcript,
      }),
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Scam report submission failed: ${response.statusCode}');
    }
  }
}
