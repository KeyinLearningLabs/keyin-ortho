import microcred1 from '../assets/shutterstock_2291044183.jpg'
import microcred2 from '../assets/shutterstock_2318581017.jpg'

const audience = 'Who Should Take This Course?'
const curriculum = 'What Your Staff Will Learn'

export interface MicrocredentialCard {
  id: string
  mcName: string
  name: string
  description: string
  card_img: string
  order: number
}

export interface MicrocredentialPage {
  id: string
  order: number
  card_img: string
  title: string
  subtitle: string
  description: string
  knowledge: string
  audience_title: string
  audience_description: string
  curriculum_title: string
  curriculum_description: string
  closing: string
}

export const getMCTourismData = (): MicrocredentialCard[] => {
  return [
    {
      id: 'tourism',
      mcName: 'Front Line Staff Training',
      name: 'You Are Tourism',
      description:
        'All front-line employees will benefit from this course as they learn to embrace their role in tourism to exceed expectations and please every customer.',
      card_img: microcred1,
      order: 0
    },
    {
      id: 'rooftop',
      mcName: 'Tourism Marketing Training',
      name: 'Shout From The Rooftops',
      description:
        'Anyone in your business who contributes to your marketing efforts will gain valuable insights in this fast-paced and solutions-packed course. Find new ways to leverage your marketing to build your brand and maximize traffic.',
      card_img: microcred2,
      order: 1
    }
  ]
}

export const getMCTourismById = (): MicrocredentialPage[] => {
  return [
    {
      id: 'tourism',
      order: 0,
      card_img: microcred1,
      title: 'Frontline Staff Training <span class="font-semibold">“You Are Tourism”</span>',
      subtitle: 'Program Overview',
      description:
        'Frontline staff are more than employees; they are ambassadors of <span class=font-semibold>Newfoundland & Labrador’s tourism industry.</span> Their ability to provide knowledgeable, welcoming, and memorable service can turn a one-time visitor into a lifelong champion of your business.',
      knowledge:
        '<span class="font-semibold">This dedicated Tourism micro-credential equips your employees with the knowledge, skills, and confidence to:</span> </br><div class="ml-6">– Deliver exceptional service that keeps guests coming back. </div><div class="ml-6">– Enhance your business reputation through positive visitor experiences. </div><div class="ml-6">– Understand traveler expectations and how to exceed them. </div><div class="ml-6">– Support your bottom line by driving customer satisfaction and word-of-mouth marketing.</div>',
      audience_title: audience,
      audience_description:
        'This micro-credential is designed for any operators whose employees interact with visitors, including: </br><div class="ml-6">– <span class="font-semibold">Accommodations</span> – hotels, inns, B&Bs, short-term rentals.</div><div class="ml-6">– <span class="font-semibold">Food & Beverage</span> – restaurants, cafes, pubs, food trucks </div><div class="ml-6">– <span class="font-semibold">Tour Operators & Attractions</span>  – adventure tours, cultural experiences, festivals</div><div class="ml-6">– <span class="font-semibold">And Many More!</span></div>',
      curriculum_title: curriculum,
      curriculum_description:
        '<span class="font-semibold">• Tourism’s Role in Our Economy</span> – How frontline service impacts local businesses and the industry as a whole. </br></br> <span class="font-semibold">• Understanding Travelers</span>  – What visitors expect, what they’re looking for, and how your staff can enhance their journey. </br></br><span class="font-semibold">• Going Beyond the Basics</span>  – Encouraging staff to be knowledgeable beyond their own workplace to support cross-promotion and the overall visitor experience.</br></br><span class="font-semibold">• Customer Service Excellence</span> – Strategies for delivering consistently positive interactions in a fast-paced,high-volume industry.</br></br> <span class="font-semibold">• Taking Ownership & Pride</span> - Helping employees see the bigger picture, take pride in their role, and recognize their impact on business success. </br></br><span class="font-semibold">• Bringing it all together</span> - Practical, actionable takeaways for elevating every customer interaction.',
      closing:
        'If your business relies on tourism traffic, investing in your frontline staff ensures better service, stronger guest engagement, and greater long-term success. Give your team the skills they need to enhance guest satisfaction, boost your brand, and con-tribute to a thriving tourism industry ahead of the 2025 Season.'
    },
    {
      id: 'rooftop',
      order: 1,
      card_img: microcred2,
      title: 'Tourism Marketing Training  <span class="font-semibold">“Shout It From The Rooftops”</span>',
      subtitle: 'Program Overview',
      description:
        'Great tourism marketing is about telling our stories to the world—showing potential visitors why they should come here, what they’ll experience, and how our culture, people, and places will leave a lasting impression. But it also must connect with your target audience, in places and ways that inspire them to engage with you and make meaningful connections.',
      knowledge:
        'The <span class="font-semibold">Tourism Marketing:</span> Shout It From The Rooftops micro-credential ensures your team is equipped with the practical marketing skills to: </br><div class="ml-6">– Build a strong, recognizable brand that resonates with visitors. </div><div class="ml-6">– Leverage digital tools and social media to attract and engage travelers. </div><div class="ml-6">– Create compelling storytelling and content that sets your business apart. </div><div class="ml-6">– Maximize marketing efforts with limited time and resources.</div>',
      audience_title: audience,
      audience_description:
        'This micro-credential is designed for anyone responsible for promoting your business, including: </br><div class="ml-6">– Business owners and managers looking to strengthen their marketing efforts.</div><div class="ml-6">– Employees involved in social media, promotions, or customer engagement. </div><div class="ml-6">– Tourism operators who want to attract more visitors and increase revenue. </div> <div class="mt-5 -mb-5">If your business relies on attracting and retaining customers, investing in your marketing team ensures greater visibility, stronger engagement, and long-term business success.</span></div>',
      curriculum_title: curriculum,
      curriculum_description:
        '<span class="font-semibold">• The Power of Brand Storytelling</span> - How to craft authentic, compelling narratives that make your business stand out.</br></br><span class="font-semibold">• Digital Marketing Essentials</span>  – Practical strategies for using social media, websites, and online reviews to drive bookings and engagement. </br></br><span class="font-semibold">• Maximizing Your Marketing Budget </span> – How to get the most impact from limited resources and focus on what works. </br></br><span class="font-semibold">• Understanding Your Audience</span> – How to identify key visitor demographics and tailor marketing efforts to meet their needs. </br></br><span class="font-semibold">• Content Creation & Promotion</span>  – Best practices for creating engaging content, stunning visuals, and impactful campaigns. </br></br><span class="font-semibold">• Bringing It All Together</span>   – A step-by-step action plan for applying these strategies to attract more visitors and grow your business.',
      closing:
        'Give your team the skills they need to increase brand visibility, attract more visitors, and drive revenue growth.'
    }
  ]
}
