import supabase from '../../../config/supabaseClient'

export default defineEventHandler(async event => {
  // Only allow POST requests
  assertMethod(event, ['POST']);

  const body = await readBody(event);
  console.log('Id: ' + body.id);

  const { data, error } = await supabase.from('attendee')
    .select().eq('id', body.id)

  if (error) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Error in ophalen deelnemers',
    });
  } else {
    return data;
  }
});
