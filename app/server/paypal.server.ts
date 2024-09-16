import axios from 'axios'

const baseURL = process.env.PAYPAL_API
const clientId = process.env.PAYPAL_CLIENT_ID
const clientSecret = process.env.PAYPAL_CLIENT_SECRET

export async function getAccessToken() {
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')

  const response = await axios.post(
    `${baseURL}/v1/oauth2/token`,
    params.toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: clientId!,
        password: clientSecret!,
      },
    }
  )

  return response.data.access_token
}

export async function createPaymentOrder(amount: number) {
  const accessToken = await getAccessToken()

  const orderResponse = await axios({
    url: `${baseURL}/v2/checkout/orders`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'GBP',
            value: amount, // You can calculate the total based on the cart data
          },
        },
      ],
    },
  })

  return orderResponse.data
}
