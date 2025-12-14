// Stub pour @tauri-apps/api en version web
// Ce fichier remplace l'import de @tauri-apps/api lors du build web

export const invoke = async (_cmd: string, _args?: any): Promise<any> => {
  console.log('Tauri API not available in web version');
  return Promise.resolve(null);
};

export default {
  invoke,
};

