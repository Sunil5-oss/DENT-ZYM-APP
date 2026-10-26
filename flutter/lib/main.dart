import 'package:flutter/material.dart';
import 'core/theme/app_theme.dart';
import 'models/user_profile.dart';

void main() {
  runApp(const DentZymApp());
}

class DentZymApp extends StatelessWidget {
  const DentZymApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DENT ZYM APP',
      debugShowCheckedModeBanner: false,
      theme: DentZymTheme.darkTheme,
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final UserProfile _user = UserProfile(
    id: 'usr-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@dentzym.app',
    age: 26,
    heightCm: 178,
    weightKg: 76.5,
    experience: 'Intermediate',
    goal: 'Muscle Gain',
    diet: 'Vegetarian',
    location: 'Gym',
    workoutDaysPerWeek: 4,
    isPremium: true,
  );

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width >= 768;

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: DentZymTheme.electricLime.withOpacity(0.15),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(
                Icons.fitness_center,
                color: DentZymTheme.electricLime,
                size: 20,
              ),
            ),
            const SizedBox(width: 10),
            const Text(
              'DENT ZYM APP',
              style: TextStyle(
                fontWeight: FontWeight.w900,
                letterSpacing: 1.2,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.workspace_premium, color: DentZymTheme.electricLime),
            onPressed: () {},
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: Row(
        children: [
          if (isDesktop)
            NavigationRail(
              backgroundColor: DentZymTheme.deepCharcoal,
              selectedIndex: _currentIndex,
              onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
              labelType: NavigationRailLabelType.all,
              selectedIconTheme: const IconThemeData(color: DentZymTheme.electricLime),
              unselectedIconTheme: const IconThemeData(color: DentZymTheme.mutedGray),
              destinations: const [
                NavigationRailDestination(
                  icon: Icon(Icons.dashboard_outlined),
                  selectedIcon: Icon(Icons.dashboard),
                  label: Text('Dashboard'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.fitness_center_outlined),
                  selectedIcon: Icon(Icons.fitness_center),
                  label: Text('Workouts'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.auto_awesome_outlined),
                  selectedIcon: Icon(Icons.auto_awesome),
                  label: Text('AI Coach'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.restaurant_outlined),
                  selectedIcon: Icon(Icons.restaurant),
                  label: Text('Nutrition'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.show_chart),
                  selectedIcon: Icon(Icons.trending_up),
                  label: Text('Progress'),
                ),
              ],
            ),
          Expanded(
            child: _buildCurrentBody(),
          ),
        ],
      ),
      bottomNavigationBar: isDesktop
          ? null
          : BottomNavigationBar(
              currentIndex: _currentIndex,
              onTap: (idx) => setState(() => _currentIndex = idx),
              type: BottomNavigationBarType.fixed,
              backgroundColor: DentZymTheme.midnightGraphite,
              selectedItemColor: DentZymTheme.electricLime,
              unselectedItemColor: DentZymTheme.mutedGray,
              selectedFontSize: 11,
              unselectedFontSize: 10,
              items: const [
                BottomNavigationBarItem(
                  icon: Icon(Icons.dashboard),
                  label: 'Home',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.fitness_center),
                  label: 'Workouts',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.auto_awesome),
                  label: 'AI Coach',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.restaurant),
                  label: 'Nutrition',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.show_chart),
                  label: 'Progress',
                ),
              ],
            ),
    );
  }

  Widget _buildCurrentBody() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: DentZymTheme.surfaceCharcoal,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: DentZymTheme.borderSubtle),
              ),
              child: Column(
                children: [
                  Text(
                    'Welcome to DENT ZYM APP, ${_user.name}',
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: DentZymTheme.softWhite,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Train Hard · Stay Strong · Transform Yourself',
                    style: TextStyle(
                      fontSize: 12,
                      color: DentZymTheme.mutedGray,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                    decoration: BoxDecoration(
                      color: DentZymTheme.electricLime.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: DentZymTheme.electricLime.withOpacity(0.4)),
                    ),
                    child: Text(
                      'Target Goal: ${_user.goal} · ${_user.experience}',
                      style: const TextStyle(
                        fontSize: 12,
                        color: DentZymTheme.electricLime,
                        fontWeight: FontWeight.bold,
                      ),
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
