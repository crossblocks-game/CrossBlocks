package net.mcreator.newhorizon.client;

import net.fabricmc.fabric.api.client.rendering.v1.HudRenderCallback;
import net.minecraft.client.MinecraftClient;
import net.minecraft.client.render.RenderLayer;
import net.minecraft.util.Arm;
import net.minecraft.util.Identifier;
import net.minecraft.util.math.MathHelper;

public class TabletAnimationRenderer {

    // Contrôle l'animation depuis une procédure MCreator
    public static boolean isPlaying = false;
    private static float progress = 0f;

    // Remplace "newhorizon" par le nom exact de ton mod en minuscules
    private static final Identifier TABLET_TEXTURE =
        Identifier.of("newhorizon", "textures/gui/tablet.png");

    public static void register() {
        HudRenderCallback.EVENT.register((drawContext, tickDelta) -> {
            if (!isPlaying) return;

            MinecraftClient client = MinecraftClient.getInstance();
            if (client.player == null) return;

            // Avance la progression (0.0 → 1.0)
            progress = Math.min(progress + 0.04f, 1.0f);

            // Effet ease-out : démarre vite, ralentit à la fin
            float eased = 1f - (1f - progress) * (1f - progress);

            int screenW = client.getWindow().getScaledWidth();
            int screenH = client.getWindow().getScaledHeight();

            int tabletW = 180;
            int tabletH = 100;

            // Détecte la main dominante du joueur
            boolean rightHand = client.options.getMainArm().getValue() == Arm.RIGHT;

            // Position finale selon la main (bas droit ou bas gauche)
            int finalX = rightHand ? (screenW - tabletW - 30) : 30;
            int finalY = screenH - tabletH - 30;

            // Part de hors-écran en bas
            int startY = screenH + 20;

            // Position interpolée
            int currentX = finalX;
            int currentY = (int) MathHelper.lerp(eased, startY, finalY);

            // ── Dessine la main du joueur avec son propre skin ──
            var skin = client.player.getSkinTextures();
            Identifier skinTex = skin.texture();

            // Coordonnées UV du bras dans le skin (format 64x64)
            float skinU = rightHand ? 40f : 32f;
            float skinV = rightHand ? 16f : 48f;
            int handW = 28;
            int handH = 55;
            int handX = rightHand
                ? (currentX + tabletW - 15)
                : (currentX - handW + 15);
            int handY = currentY + tabletH - handH + 15;

            drawContext.drawTexture(
                RenderLayer::getGuiTextured,
                skinTex,
                handX, handY, skinU, skinV,
                handW, handH, 64, 64
            );

            // ── Dessine la tablette ──
            drawContext.drawTexture(
                RenderLayer::getGuiTextured,
                TABLET_TEXTURE,
                currentX, currentY, 0, 0,
                tabletW, tabletH, tabletW, tabletH
            );

            // Animation terminée → ouvre ta GUI
            if (progress >= 1.0f) {
                isPlaying = false;
                progress = 0f;
                // La GUI s'ouvrira via la procédure MCreator
            }
        });
    }

    // Appelée depuis une procédure MCreator pour lancer l'animation
    public static void play() {
        isPlaying = true;
        progress = 0f;
    }
}