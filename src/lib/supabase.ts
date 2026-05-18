import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://czhdpifhgoewuhvcopkz.supabase.co'
const supabaseAnonKey = 'sb_publishable_hpPC6F76Uw5Xb9OrwX8MkA_lfciPAWF'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
