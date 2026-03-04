const RUNWAY_API_KEY = 'key_bfe13e527599429498f6bc2a28f3ee965fc87d0ab0f2d0d6484fab7af29e6394d7e1c3c631e199251c106ee55715c661ea61abef87078a4287739046eefdb4cf' // Replace with your actual key

async function testRunway() {
  console.log('🧪 Testing Runway ML API...')
  
  try {
    const response = await fetch('https://api.dev.runwayml.com/v1/image_to_video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RUNWAY_API_KEY}`,
        'X-Runway-Version': '2024-11-06'
      },
      body: JSON.stringify({
        model: 'gen3a_turbo',
        prompt_text: 'Camera slowly pans across a futuristic city skyline at sunset',
        duration: 5,
        ratio: '16:9'
      })
    })

    const data = await response.json()
    
    if (!response.ok) {
      console.error('❌ API Error:', data)
      return
    }

    console.log('✅ Generation started!')
    console.log('Task ID:', data.id)
    console.log('Status:', data.status)
    console.log('\n💡 Your API key works! Now checking generation status...')

    // Poll for completion
    const taskId = data.id
    let attempts = 0
    const maxAttempts = 60 // 2 minutes max wait

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)) // Wait 5 seconds
      
      const statusResponse = await fetch(`https://api.dev.runwayml.com/v1/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${RUNWAY_API_KEY}`,
          'X-Runway-Version': '2024-11-06'
        }
      })

      const statusData = await statusResponse.json()
      console.log(`\n[Attempt ${attempts + 1}] Status: ${statusData.status}`)

      if (statusData.status === 'SUCCEEDED') {
        console.log('\n🎉 VIDEO GENERATED SUCCESSFULLY!')
        console.log('Video URL:', statusData.output?.[0])
        console.log('\n✅ Runway ML integration is ready!')
        return
      }

      if (statusData.status === 'FAILED') {
        console.log('❌ Generation failed:', statusData.failure)
        return
      }

      attempts++
    }

    console.log('⏱️ Timeout: Generation took too long')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testRunway()