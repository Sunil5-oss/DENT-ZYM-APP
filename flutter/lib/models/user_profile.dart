class UserProfile {
  final String id;
  final String name;
  final String email;
  final int age;
  final double heightCm;
  final double weightKg;
  final String experience; // Beginner, Intermediate, Advanced
  final String goal; // Muscle Gain, Fat Loss, Strength, General Fitness
  final String diet; // Vegetarian, Non-Vegetarian, Vegan
  final String location; // Gym, Home, Both
  final int workoutDaysPerWeek;
  final bool isPremium;

  UserProfile({
    required this.id,
    required this.name,
    required this.email,
    required this.age,
    required this.heightCm,
    required this.weightKg,
    required this.experience,
    required this.goal,
    required this.diet,
    required this.location,
    required this.workoutDaysPerWeek,
    this.isPremium = false,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
        'age': age,
        'heightCm': heightCm,
        'weightKg': weightKg,
        'experience': experience,
        'goal': goal,
        'diet': diet,
        'location': location,
        'workoutDaysPerWeek': workoutDaysPerWeek,
        'isPremium': isPremium,
      };

  factory UserProfile.fromJson(Map<String, dynamic> json) => UserProfile(
        id: json['id'] ?? '',
        name: json['name'] ?? '',
        email: json['email'] ?? '',
        age: json['age'] ?? 25,
        heightCm: (json['heightCm'] as num?)?.toDouble() ?? 175.0,
        weightKg: (json['weightKg'] as num?)?.toDouble() ?? 75.0,
        experience: json['experience'] ?? 'Intermediate',
        goal: json['goal'] ?? 'Muscle Gain',
        diet: json['diet'] ?? 'Vegetarian',
        location: json['location'] ?? 'Gym',
        workoutDaysPerWeek: json['workoutDaysPerWeek'] ?? 4,
        isPremium: json['isPremium'] ?? false,
      );
}
