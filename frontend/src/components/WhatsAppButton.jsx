import React from 'react'
import { Fab } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

function WhatsAppButton() {
  const handleWhatsApp = () => {
    const phoneNumber = '905551234567' // Telefon numarasını değiştirin
    const url = `https://wa.me/${phoneNumber}?text=Merhaba, size danışmak istiyorum.`
    window.open(url, '_blank')
  }

  return (
    <Fab
      color="success"
      aria-label="whatsapp"
      onClick={handleWhatsApp}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <WhatsAppIcon />
    </Fab>
  )
}

export default WhatsAppButton
