import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class DentZymTheme {
  // Brand color palette
  static const Color midnightGraphite = Color(0xFF101116);
  static const Color deepCharcoal = Color(0xFF191B23);
  static const Color surfaceCharcoal = Color(0xFF20232E);
  static const Color borderSubtle = Color(0xFF2A2E3D);
  static const Color electricLime = Color(0xFFC6FF4D);
  static const Color electricViolet = Color(0xFF9B7BFF);
  static const Color softWhite = Color(0xFFF5F6FA);
  static const Color mutedGray = Color(0xFFA4A7B2);
  static const Color accessibleRed = Color(0xFFFF4D4D);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: midnightGraphite,
      primaryColor: electricLime,
      colorScheme: const ColorScheme.dark(
        primary: electricLime,
        secondary: electricViolet,
        surface: deepCharcoal,
        error: accessibleRed,
        onPrimary: midnightGraphite,
        onSurface: softWhite,
      ),
      textTheme: GoogleFonts.plusJakartaSansTextTheme(
        ThemeData.dark().textTheme.apply(
          bodyColor: softWhite,
          displayColor: softWhite,
        ),
      ),
      cardTheme: CardTheme(
        color: deepCharcoal,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
          side: const BorderSide(color: borderSubtle, width: 1),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: midnightGraphite,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: softWhite,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
