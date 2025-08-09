import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/Entity/user.entity';
import { Profile } from '../profile/profile.entity';
import { Tweets } from '../tweets/tweets.entity';
import { Hashtag } from '../hashtag/hashtag.entity';
import { HashingProvider } from '../auth/provider/hashing.provider';

@Injectable()
export class DatabaseSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Tweets)
    private readonly tweetRepository: Repository<Tweets>,
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
    private readonly hashingProvider: HashingProvider,
  ) {}

  async seed() {
    // Check if data already exists
    const userCount = await this.userRepository.count();
    if (userCount > 0) {
      console.log('Database already seeded');
      return;
    }

    // Create sample hashtags
    const hashtags = await this.hashtagRepository.save([
      { name: 'nestjs' },
      { name: 'typescript' },
      { name: 'nodejs' },
      { name: 'javascript' },
      { name: 'webdev' },
    ]);

    // Create sample users
    const users: User[] = [];
    for (let i = 1; i <= 5; i++) {
      const hashedPassword = await this.hashingProvider.hashPassword('password123');
      
      const user = await this.userRepository.save({
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: hashedPassword,
      });

      // Create profile for user
      const profile = await this.profileRepository.save({
        bio: `This is user ${i}'s bio`,
        location: `City ${i}`,
        website: `https://user${i}.com`,
        user: user,
      });

      user.profile = profile;
      users.push(user);
    }

    // Create sample tweets
    const sampleTweets = [
      'Hello world! This is my first tweet using #nestjs',
      'Learning #typescript is awesome! #webdev',
      'Building APIs with #nodejs is so much fun',
      'Just discovered some cool #javascript features',
      'NestJS makes building scalable applications easy #nestjs #typescript',
    ];

    for (let i = 0; i < sampleTweets.length; i++) {
      const tweet = await this.tweetRepository.save({
        text: sampleTweets[i],
        user: users[i % users.length],
        hashtags: [hashtags[i]],
      });
    }

    console.log('Database seeded successfully!');
  }
}
