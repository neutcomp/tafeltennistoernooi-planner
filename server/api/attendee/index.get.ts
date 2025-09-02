import supabase from '../../../config/supabaseClient'

export default defineEventHandler(async event => {
  // Only allow GET requests
  assertMethod(event, ['GET']);

  //const { searchOn } = event.context.params;
  console.log('Session: ' + supabase.auth.getSession.toString());

  const { error, data } = await supabase.from('attendee')
    .select();
  console.log('test');

  if (error) {
    console.log(error);

    throw createError({
      statusCode: 200,
      statusMessage: 'Error in ophalen deelnemers',
    });
  } else {
    console.log(data);

    return data;
  }
});
