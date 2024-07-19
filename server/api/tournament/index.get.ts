import supabase from '../../../config/supabaseClient'

export default defineEventHandler(async event => {
  const { data, error } = await supabase.from('Tournament')
    .select();

  if (error) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Error in ophalen toernooi',
    });
  } else {
    return data;
  }
});
