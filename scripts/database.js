import { supabase } from './config.js';

const CANDIDATES_TABLE = 'candidates';

/**
 * Sube un archivo PDF a Supabase Storage
 * @param {File} file - Archivo PDF del CV
 * @returns {Promise<string>} URL pública del archivo
 */
const uploadCV = async (file) => {
    const filePath = `cvs/${Date.now()}_${file.name}`;
    
    const { data, error } = await supabase.storage
        .from('cvs')
        .upload(filePath, file);
    
    if (error) throw error;
    
    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
        .from('cvs')
        .getPublicUrl(filePath);
    
    return publicUrl;
};

/**
 * Guarda los datos del candidato en la base de datos
 * @param {Object} candidateData - Datos del candidato
 * @returns {Promise<Object>} Datos insertados
 */
const saveCandidate = async (candidateData) => {
    const { data, error } = await supabase
        .from(CANDIDATES_TABLE)
        .insert([candidateData])
        .select();
    
    if (error) throw error;
    
    return data[0];
};

export { uploadCV, saveCandidate };