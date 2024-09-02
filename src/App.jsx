// App.jsx
import { useState } from 'react';
import { AppShell, Button, Group, Container } from '@mantine/core';
import Gallery from "./subcomponents/Gallery";
import Uploader from "./subcomponents/Uploader";

function App() {
  const [activeComponent, setActiveComponent] = useState('gallery');

  return (
    <AppShell>
      <Container>
        <Group justify="center" mt="md" mb="xl">
          <Button onClick={() => setActiveComponent('gallery')}>Gallery</Button>
          <Button onClick={() => setActiveComponent('upload')}>Upload</Button>
        </Group>
        
        {activeComponent === 'gallery' ? <Gallery /> : <Uploader />}
      </Container>
    </AppShell>
  );
}

export default App;
