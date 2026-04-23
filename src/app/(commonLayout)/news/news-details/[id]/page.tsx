"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type NewsItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  content?: string;
  updatedDate?: string;
};

const newsData: Record<number, NewsItem> = {
  1: {
    id: 1,
    title:
      "Political Tensions Rise as the Veridian Accord Faces Scrutiny. Experts analyze the potential impacts on global trade and diplomacy amid growing concerns.",
    category: "Politics",
    date: "20 April 2026",
    updatedDate: "19 April 2026",
    image: "/icons/newsLayout/newsHero.png",
    content: `The administration of President Theron Vance is facing increasing scrutiny over its foreign policies, with critics raising concerns about the potential impact on global stability. Experts from around the world are weighing in on the potential ramifications as opposition intensifies. This article delves into the key issues and perspectives surrounding the Vance administration's approach to international relations.

**The Core of the Controversy**

At the heart of the controversy are several key policy decisions enacted by the Vance administration. These include the withdrawal from the Trans-Pacific Partnership, the imposition of tariffs on goods from key trading partners, and a more assertive stance in international disputes. Critics argue that these policies undermine international cooperation, disrupt established trade relationships, and increase the risk of conflict.

**Impact on Global Trade**

One of the most contentious aspects of the Vance administration's policies is its approach to global trade. The decision to impose tariffs on goods from countries such as Volantis and Aerilon has sparked retaliatory measures, leading to a trade war that has disrupted supply chains and increased costs for businesses and consumers. Experts warn that this protectionist approach could lead to a decline in global economic growth and undermine the stability of the international trading system.

**Strained Diplomatic Relations**

In addition to trade disputes, the Vance administration's foreign policies have also strained diplomatic relations with key allies. The administration's more assertive stance in international disputes, such as the conflict in the Cygnus region, has led to disagreements with countries that prefer a more diplomatic approach. Critics argue that this has isolated the United States and undermined its ability to address global challenges effectively.

**Expert Opinions**

Experts from various fields have weighed in on the potential ramifications of the Vance administration's foreign policies. Economists warn of the negative impact on global trade and economic growth, while political scientists express concern about the erosion of international cooperation and the increased risk of conflict. Some experts argue that the Vance administration's policies are based on a flawed understanding of international relations and could have long-lasting consequences for global stability.

**The Opposition's Response**

Opposition parties have been vocal in their criticism of the Vance administration's foreign policies. They argue that these policies are reckless, irresponsible, and undermine the United States' standing in the world. Opposition leaders have called for a more cooperative approach to international relations, emphasizing the importance of diplomacy, trade, and multilateralism.

**The Administration's Defense**

The Vance administration has defended its foreign policies, arguing that they are necessary to protect the United States' interests and promote its values. Administration officials argue that the withdrawal from the Trans-Pacific Partnership was necessary to protect American jobs, while the imposition of tariffs was intended to level the playing field for American businesses. They also argue that a more assertive stance in international disputes is necessary to deter aggression and maintain peace.

**The Global Perspective**

The Vance administration's foreign policies have been met with mixed reactions from countries around the world. Some countries have expressed support for the administration's approach, while others have voiced concerns about the potential impact on global stability. Many countries are closely monitoring the situation and assessing the potential implications for their own interests.

**The Future of Global Stability**

The long-term impact of the Vance administration's foreign policies on global stability remains uncertain. Some experts believe that these policies could lead to a more fragmented and conflict-prone world, while others argue that they could ultimately lead to a more balanced and stable international order. The future will depend on how the Vance administration responds to the challenges and opportunities it faces in the years ahead.

**Conclusion**

The Vance administration's foreign policies have sparked intense debate and controversy, with critics questioning their impact on global stability. As experts continue to weigh in on the potential ramifications, it is clear that the administration's approach to international relations will have far-reaching consequences for the world. Whether these consequences will be positive or negative remains to be seen, but one thing is certain: the Vance administration's foreign policies will continue to be a subject of intense scrutiny and debate for years to come.`,
  },
  2: {
    id: 2,
    title:
      "Zenith Sharks secure a stunning victory in the Intercontinental Cup final...",
    category: "Sports",
    date: "20/04/2026",
    image: "/icons/newsLayout/newsHero.png",
    content: `The Zenith Sharks have secured a stunning victory in the Intercontinental Cup final, defeating their rivals in an intense match that will be remembered for years to come. The victory marks a historic moment for the team and their passionate fanbase.

**A Historic Achievement**

The Zenith Sharks' triumph in the Intercontinental Cup final represents the pinnacle of their competitive journey. After months of rigorous training and strategic preparation, the team demonstrated exceptional skill and determination on the field. Their cohesive teamwork and tactical excellence were instrumental in securing this prestigious title.

**Match Highlights**

The final match was characterized by intense competition and electrifying moments. Both teams displayed remarkable athleticism and strategic prowess, creating a spectacle that captivated audiences worldwide. The Sharks' ability to maintain composure under pressure proved to be the decisive factor in their victory.

**Coach's Perspective**

Coach Marcus Sterling praised his team's dedication and resilience throughout the tournament. He highlighted the importance of teamwork and individual excellence, noting that each player contributed significantly to the team's success. The coaching staff's innovative strategies played a crucial role in preparing the team for this momentous occasion.

**Player Performances**

Several players delivered outstanding performances during the final match. The goalkeeper's exceptional saves, the defenders' solid wall, and the forwards' clinical finishing all contributed to the team's success. Individual excellence combined with collective effort created the perfect formula for victory.

**Fan Reactions**

Thousands of devoted fans celebrated the Sharks' victory, displaying unwavering support throughout the match. The passionate crowd's energy and encouragement provided an additional boost to the team's performance. This victory belongs not only to the players but to every fan who believed in the team.

**Future Prospects**

With this championship victory, the Zenith Sharks have established themselves as a dominant force in international sports. The team's success opens doors to new opportunities and challenges. Experts predict that this victory will inspire the team to pursue even greater achievements in the future.

**Conclusion**

The Zenith Sharks' Intercontinental Cup victory is a testament to their hard work, dedication, and unwavering commitment to excellence. This achievement will serve as a foundation for future success and will be celebrated by fans for generations to come.`,
  },
  3: {
    id: 3,
    title:
      "Empowering Minds: Innovative Teaching Methods for Enhanced Learning outcomes...",
    category: "Education",
    date: "20/04/2026",
    image: "/icons/newsLayout/newsHero.png",
    content: `Innovative teaching methods are transforming the landscape of education, offering students enhanced learning outcomes and preparing them for success in the modern world. Educational institutions are increasingly adopting these progressive approaches to foster critical thinking and creativity.

**The Evolution of Education**

Modern education is undergoing a significant transformation. Traditional lecture-based methods are giving way to interactive and student-centered approaches that encourage engagement and deeper understanding. This shift reflects a broader recognition of the diverse learning needs and styles of today's students.

**Technology Integration**

Digital tools and platforms have become essential components of contemporary teaching. From virtual classrooms to interactive learning applications, technology enhances accessibility and provides personalized learning experiences. These tools enable educators to tailor instruction to individual student needs and learning paces.

**Active Learning Strategies**

Innovative teachers are implementing active learning strategies that encourage student participation and hands-on engagement. Project-based learning, collaborative problem-solving, and experiential activities promote deeper understanding and retention of concepts. These methods transform students from passive recipients to active participants in their education.

**Critical Thinking Development**

Emphasis on critical thinking skills is reshaping curriculum design and assessment methods. Students are encouraged to analyze information, question assumptions, and develop reasoned arguments. These skills are essential for success in higher education and professional careers.

**Inclusive Learning Environments**

Modern teaching approaches prioritize inclusivity, ensuring that all students have equal access to quality education. Universal Design for Learning (UDL) principles guide educators in creating flexible learning environments that accommodate diverse learning styles and abilities.

**Teacher Professional Development**

Supporting teachers through ongoing professional development is crucial for implementing innovative methods. Educators receive training in new pedagogical approaches, technology integration, and student-centered instruction. This investment in teacher development ensures the quality and consistency of innovative teaching practices.

**Student Outcomes and Success**

Research demonstrates that innovative teaching methods lead to improved student outcomes. Students exhibit higher engagement levels, better academic performance, and stronger motivation to learn. These results validate the effectiveness of progressive educational approaches.

**Conclusion**

Empowering minds through innovative teaching methods is reshaping the future of education. As institutions continue to adopt progressive approaches, students benefit from enhanced learning experiences and better preparation for life's challenges.`,
  },
  4: {
    id: 4,
    title:
      "Finding Your Focus: Practical Strategies for Staying Motivated and productive...",
    category: "Motivation",
    date: "20/04/2026",
    image: "/icons/newsLayout/newsHero.png",
    content: `In today's fast-paced world, maintaining focus and staying motivated can be challenging. However, with the right strategies and mindset, anyone can develop the discipline needed to achieve their goals and maintain sustained productivity.

**Understanding Focus**

Focus is the ability to direct your attention toward a specific goal or task while filtering out distractions. In an age of constant digital stimulation, cultivating focus has become increasingly difficult yet more important than ever. Understanding the nature of focus is the first step toward improving it.

**The Role of Goal Setting**

Clear, well-defined goals provide direction and purpose for your efforts. Setting SMART goals—Specific, Measurable, Achievable, Relevant, and Time-bound—creates a roadmap for success. Regular review and adjustment of goals help maintain alignment with your values and aspirations.

**Managing Distractions**

Identifying and minimizing distractions is essential for maintaining focus. This involves both external factors like noise and notifications, as well as internal factors like intrusive thoughts. Creating a dedicated workspace and establishing boundaries can significantly improve concentration.

**Building Consistent Habits**

Consistent habits form the foundation of sustained productivity. Starting small and gradually building routines creates momentum without overwhelming yourself. Habit stacking—linking new habits to existing ones—makes developing productive behaviors more manageable.

**The Importance of Breaks**

Paradoxically, taking regular breaks enhances overall productivity. Short breaks allow your mind to rest and recharge, improving focus when you return to work. The Pomodoro Technique, which alternates focused work with brief breaks, has proven effective for many.

**Physical and Mental Health**

Adequate sleep, regular exercise, and proper nutrition are fundamental to sustained motivation and focus. Physical activity improves cognitive function, while quality sleep consolidates learning and restores mental energy. Neglecting these basics undermines all other productivity strategies.

**Tracking Progress**

Measuring progress toward your goals provides motivation and valuable feedback. Regular tracking helps identify what's working and what needs adjustment. Celebrating small wins along the way maintains momentum and motivation.

**Conclusion**

Finding your focus and maintaining motivation is a journey that requires commitment and self-awareness. By implementing practical strategies and prioritizing your well-being, you can achieve sustained productivity and accomplish your most important goals.`,
  },
  5: {
    id: 5,
    title:
      "Tune In: The 'Chatham Zen' Podcast for Daily Mindfulness. Discover practical tips...",
    category: "Podcast",
    date: "20/04/2026",
    image: "/icons/newsLayout/newsHero.png",
    content: `The 'Chatham Zen' Podcast has emerged as a leading resource for mindfulness and meditation guidance. With daily episodes providing practical tips and insights, this podcast is transforming the way people approach their mental wellness and daily practices.

**Introduction to Chatham Zen**

'Chatham Zen' is a daily podcast dedicated to helping listeners develop mindfulness practices and cultivate inner peace. Each episode features expert guidance, practical exercises, and inspiring conversations that resonate with busy individuals seeking balance in their lives.

**Daily Mindfulness Practices**

The podcast emphasizes accessible mindfulness techniques that can be integrated into daily routines. From morning meditation to evening reflection exercises, listeners discover practices suitable for different times of day and varying experience levels.

**Expert Guidance and Insights**

The show features interviews with mindfulness experts, meditation teachers, and wellness professionals. Their insights provide scientific backing and practical wisdom that enhance the listener's understanding of mindfulness benefits and techniques.

**Addressing Modern Stress**

In response to increasing stress in modern life, the podcast offers targeted episodes addressing specific concerns—workplace anxiety, sleep issues, relationship challenges, and more. These focused discussions help listeners apply mindfulness to their particular situations.

**Building a Community**

The podcast has fostered a vibrant community of listeners committed to mindfulness. Through social media interaction and listener testimonials, participants share their experiences and support each other's wellness journeys.

**Practical Techniques**

Episodes feature detailed instructions for various meditation techniques, breathing exercises, and mindfulness practices. The practical approach ensures listeners can immediately apply what they learn to their daily lives.

**Listener Transformations**

Many listeners report significant improvements in their mental health, sleep quality, and overall well-being after regularly engaging with the podcast. These success stories demonstrate the real-world impact of consistent mindfulness practice.

**Expanding Accessibility**

By offering free, daily content, 'Chatham Zen' makes mindfulness accessible to everyone regardless of financial circumstances. This democratization of mental wellness support reflects the podcast's mission to help as many people as possible.

**Conclusion**

The 'Chatham Zen' Podcast represents a powerful tool for personal transformation. Through daily guidance and community support, it empowers listeners to develop sustainable mindfulness practices and achieve greater peace and well-being in their lives.`,
  },
};

export default function NewsDetailsPage() {
  const params = useParams();
  const id = Number(params.id);
  const news = newsData[id];

  if (!news) {
    return (
      <div className="w-full py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground">News not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Main Content */}
        <div>
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            {news.title}
          </h1>

          {/* Date and Update Info */}
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <span className="text-sm text-primary font-semibold">
              {news.date}
            </span>
            {news.updatedDate && (
              <>
                <span className="text-primary">|</span>
                <span className="text-sm text-primary font-semibold">
                  Updated: {news.updatedDate}
                </span>
              </>
            )}
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="space-y-6">
            {news.content &&
              news.content.split("\n\n").map((paragraph, index) => {
                // Check if paragraph starts with ** (bold header)
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  const headerText = paragraph.slice(2, -2);
                  return (
                    <h2
                      key={index}
                      className="text-xl md:text-2xl font-bold text-foreground mt-8 mb-4"
                    >
                      {headerText}
                    </h2>
                  );
                }

                // Handle inline bold text
                const renderWithBold = (text: string) => {
                  const parts = text.split(/(\*\*.*?\*\*)/g);
                  return parts.map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return <strong key={i}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  });
                };

                return (
                  <p
                    key={index}
                    className="text-foreground/80 leading-relaxed text-base md:text-lg"
                  >
                    {renderWithBold(paragraph)}
                  </p>
                );
              })}
          </div>
        </div>
      </div>

      {/* Related News Section - Import and use ReleventNews component */}
      {/* <ReleventNews /> */}
    </div>
  );
}
